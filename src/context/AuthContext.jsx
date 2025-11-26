import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('evara_user')
      if(raw) setUser(JSON.parse(raw))
    }catch(e){
      console.warn('Failed to load user from localStorage', e)
    }
  }, [])

  useEffect(()=>{
    try{
      if(user) localStorage.setItem('evara_user', JSON.stringify(user))
      else localStorage.removeItem('evara_user')
    }catch(e){
      console.warn('Failed to save user to localStorage', e)
    }
  }, [user])

  const register = ({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem('evara_users') || '[]')
    if(users.find(u => u.email === email)){
      throw new Error('Email already registered')
    }
    const newUser = { id: Date.now(), username, email, password }
    users.push(newUser)
    localStorage.setItem('evara_users', JSON.stringify(users))
    setUser({ id: newUser.id, username: newUser.username, email: newUser.email })
    return newUser
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('evara_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if(!found) throw new Error('Invalid credentials')
    setUser({ id: found.id, username: found.username, email: found.email })
    return found
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
