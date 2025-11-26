import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

export default function Accounts(){
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  if(!user) {
    return <Navigate to="/login-register" />
  }

  return (
    <>
    <main className="main">
      <section className="breadcrumb">
        <ul className="breadcrumb__list flex container">
          <li><Link to="/" className="breadcrumb__link">Home</Link></li>
          <li><span className="breadcrumb__link">&gt;</span></li>
          <li><span className="breadcrumb__link">Account</span></li>
        </ul>
      </section>

      
      <section className="accounts section--lg">
        <div className="accounts__container container grid">
          <div className="account__tabs">
            <p 
              className={`account__tab ${activeTab === 'dashboard' ? 'active-tab' : ''}`} 
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fi fi-rs-settings-sliders"></i> Dashboard
            </p>
            <p 
              className={`account__tab ${activeTab === 'orders' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fi fi-rs-shopping-bag"></i> Orders
            </p>
            <p 
              className={`account__tab ${activeTab === 'update-profile' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('update-profile')}
            >
              <i className="fi fi-rs-user"></i> Update Profile
            </p>
            <p 
              className={`account__tab ${activeTab === 'address' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              <i className="fi fi-rs-marker"></i> My Address
            </p>
            <p 
              className={`account__tab ${activeTab === 'change-password' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('change-password')}
            >
              <i className="fi fi-rs-settings-sliders"></i> Change Password
            </p>
            <p className="account__tab" onClick={logout}>
              <i className="fi fi-rs-exit"></i> Logout
            </p>
          </div>
          <div className="tabs__content">
            <div className={`tab__content ${activeTab === 'dashboard' ? 'active-tab' : ''}`} id="dashboard">
              <h3 className="tab__header">Hello {user.username}</h3>
              <div className="tab__body">
                <p className="tab__description">
                  From your account dashboard. you can easily check & view your
                  recent order, manage your shipping and billing addresses and
                  edit your password and account details
                </p>
              </div>
            </div>
            <div className={`tab__content ${activeTab === 'orders' ? 'active-tab' : ''}`} id="orders">
              <h3 className="tab__header">Your Orders</h3>
              <div className="tab__body">
                {user.orders && user.orders.length > 0 ? (
                  <table className="placed__order-table">
                    <thead>
                      <tr>
                        <th>Orders</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Totals</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                          <td>{order.status}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td><Link to={`/orders/${order.id}`} className="view__order">View</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No orders yet</p>
                )}
              </div>
            </div>
            <div className={`tab__content ${activeTab === 'update-profile' ? 'active-tab' : ''}`} id="update-profile">
              <h3 className="tab__header">Update Profile</h3>
              <div className="tab__body">
                <form className="form grid" onSubmit={e => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  const users = JSON.parse(localStorage.getItem('evara_users') || '[]')
                  const userIndex = users.findIndex(u => u.id === user.id)
                  if(userIndex !== -1) {
                    users[userIndex] = {
                      ...users[userIndex],
                      username: formData.get('username') || users[userIndex].username,
                      email: formData.get('email') || users[userIndex].email
                    }
                    localStorage.setItem('evara_users', JSON.stringify(users))
                    localStorage.setItem('evara_user', JSON.stringify({
                      id: user.id,
                      username: formData.get('username') || user.username,
                      email: formData.get('email') || user.email
                    }))
                    window.location.reload()
                  }
                }}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    defaultValue={user.username}
                    className="form__input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={user.email}
                    className="form__input"
                  />
                  <div className="form__btn">
                    <button type="submit" className="btn btn--md">Save</button>
                  </div>
                </form>
              </div>
            </div>
            <div className={`tab__content ${activeTab === 'address' ? 'active-tab' : ''}`} id="address">
              <h3 className="tab__header">Shipping Address</h3>
              <div className="tab__body">
                {user.address ? (
                  <>
                    <address className="address">
                      {user.address.street} <br />
                      {user.address.city} <br />
                      {user.address.state} {user.address.zip} <br />
                      {user.address.country}
                    </address>
                    <button 
                      onClick={() => setActiveTab('edit-address')} 
                      className="edit"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <form className="form grid" onSubmit={e => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const users = JSON.parse(localStorage.getItem('evara_users') || '[]')
                    const userIndex = users.findIndex(u => u.id === user.id)
                    if(userIndex !== -1) {
                      const address = {
                        street: formData.get('street'),
                        city: formData.get('city'),
                        state: formData.get('state'),
                        zip: formData.get('zip'),
                        country: formData.get('country')
                      }
                      users[userIndex].address = address
                      localStorage.setItem('evara_users', JSON.stringify(users))
                      localStorage.setItem('evara_user', JSON.stringify({
                        ...user,
                        address
                      }))
                      window.location.reload()
                    }
                  }}>
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      className="form__input"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="form__input"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      className="form__input"
                      required
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP/Postal Code"
                      className="form__input"
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      className="form__input"
                      required
                    />
                    <div className="form__btn">
                      <button type="submit" className="btn btn--md">Save Address</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className={`tab__content ${activeTab === 'change-password' ? 'active-tab' : ''}`} id="change-password">
              <h3 className="tab__header">Change Password</h3>
              <div className="tab__body">
                <form className="form grid" onSubmit={e => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  const currentPassword = formData.get('currentPassword')
                  const newPassword = formData.get('newPassword')
                  const confirmPassword = formData.get('confirmPassword')
                  
                  const users = JSON.parse(localStorage.getItem('evara_users') || '[]')
                  const userIndex = users.findIndex(u => u.id === user.id)
                  
                  if (userIndex === -1 || users[userIndex].password !== currentPassword) {
                    alert('Current password is incorrect')
                    return
                  }
                  
                  if (newPassword !== confirmPassword) {
                    alert('New passwords do not match')
                    return
                  }
                  
                  users[userIndex].password = newPassword
                  localStorage.setItem('evara_users', JSON.stringify(users))
                  alert('Password updated successfully')
                  e.target.reset()
                }}>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    className="form__input"
                    required
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="form__input"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form__input"
                    required
                  />
                  <div className="form__btn">
                    <button type="submit" className="btn btn--md">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="newsletter section">
        <div className="newsletter__container container grid">
          <h3 className="newsletter__title flex">
            <img
              src="/assets/img/icon-email.svg"
              alt=""
              className="newsletter__icon"
            />
            Sign in to Newsletter
          </h3>
          <p className="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form action="" className="newsletter__form">
              <input
              type="text"
              placeholder="Enter Your Email"
                className="newsletter__input"
            />
            <button type="submit" className="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
    </>
  )
}
