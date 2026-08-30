'use client'
import React, { useState } from 'react'

export default function AdminLoginPage(){
  const [token, setToken] = useState('session-admin')
  const [msg, setMsg] = useState('')

  async function onLogin(e:any){
    e.preventDefault()
    setMsg('')
    try{
      const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ token }), headers: { 'Content-Type': 'application/json' } })
      const j = await res.json()
      if (j.ok) {
        setMsg('Logged in (demo). You can now access /admin pages.')
        window.location.href = '/admin'
      } else setMsg('Error')
    }catch(err:any){ setMsg('Error: '+err.message) }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Admin demo login</h1>
      <form onSubmit={onLogin} className="space-y-4">
        <div>
          <label className="block text-sm">Role token</label>
          <select value={token} onChange={e=>setToken(e.target.value)} className="w-full border p-2 rounded">
            <option value="session-super">SUPER_ADMIN</option>
            <option value="session-admin">ADMIN</option>
            <option value="session-manager">MANAGER</option>
            <option value="session-editor">CONTENT_EDITOR</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-midnight text-snow rounded">Login (set cookie)</button>
        </div>
        {msg && <div className="text-sm mt-2">{msg}</div>}
      </form>
    </div>
  )
}
