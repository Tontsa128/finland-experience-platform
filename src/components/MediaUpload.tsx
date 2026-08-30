'use client'
import React, { useState } from 'react'

export default function MediaUpload(){
  const [filename, setFilename] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('image')
  const [message, setMessage] = useState('')

  async function onUpload(e:any){
    e.preventDefault()
    setMessage('')
    try{
      const res = await fetch('/api/admin/media', { method: 'POST', body: JSON.stringify({ filename, url, type }), headers: { 'Content-Type': 'application/json' } })
      const j = await res.json()
      if (j.error) throw new Error(j.error)
      setMessage('Uploaded')
      window.location.href = '/admin/media'
    }catch(err:any){ setMessage('Error: '+err.message) }
  }

  return (
    <form onSubmit={onUpload} className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-semibold mb-4">Mock Upload</h2>
      <div className="mb-3">
        <label className="block text-sm">Filename</label>
        <input className="w-full border p-2 rounded" value={filename} onChange={e=>setFilename(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block text-sm">URL (placeholder)</label>
        <input className="w-full border p-2 rounded" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://placehold.co/800x600?text=Sample" />
      </div>
      <div className="mb-3">
        <label className="block text-sm">Type</label>
        <select className="w-full border p-2 rounded" value={type} onChange={e=>setType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="external">External</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-midnight text-snow rounded">Upload mock</button>
        <a className="px-4 py-2 border rounded" href="/admin/media">Cancel</a>
      </div>
      {message && <div className="mt-3 text-sm">{message}</div>}
    </form>
  )
}
