import React, {useEffect, useRef} from 'react'
const html = `<!DOCTYPE html>
<html lang="en">... (trimmed) ...</html>`
export default function Details(){
  const ref=useRef()
  useEffect(()=>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    ref.current.innerHTML = doc.body.innerHTML
    if(!document.getElementById('evara-main')){
      const m = document.createElement('script')
      m.id = 'evara-main'
      m.src = '/assets/js/main.js'
      m.async = false
      document.body.appendChild(m)
    }
  },[])
  return <div ref={ref}></div>
}
