'use client'
import React, { useEffect, useState } from 'react'

export default function MediaList() {
  const [items, setItems] = useState<any[]>([])
  const [query, setQuery] = useState('')

  useEffect(()=>{ fetchList() },[])
  async function fetchList(){ const res = await fetch('/api/admin/media'); const j = await res.json(); setItems(j) }

  async function onDelete(id:string){ if(!confirm('Delete media?')) return; await fetch('/api/admin/media?id='+id, { method: 'DELETE' }); fetchList() }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Media Library</h1>
        <a className="px-4 py-2 bg-midnight text-snow rounded" href="/admin/media/upload">Upload</a>
      </div>
      <div className="mb-4">
        <input placeholder="Buscar por filename, tag..." className="w-full border p-2 rounded" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.filter(i=>!query || i.filename.includes(query) || (i.tags||[]).join(' ').includes(query)).map(it=> (
          <div key={it.id} className="bg-white p-3 rounded shadow">
            <img src={it.url} alt={it.alt_text} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <div className="font-semibold">{it.title || it.filename}</div>
              <div className="text-sm text-slate">{it.type} · {it.size_bytes} bytes</div>
              <div className="text-sm text-slate">Alt: {it.alt_text}</div>
              <div className="mt-2 flex gap-2">
                <a className="px-2 py-1 border rounded text-sm" href={`#preview-${it.id}`}>Preview</a>
                <button onClick={()=>onDelete(it.id)} className="px-2 py-1 border rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
