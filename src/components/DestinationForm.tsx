'use client'
import React, { useEffect, useState } from 'react'

export default function DestinationForm({ id }: { id?: string }){
  const [data, setData] = useState<any>({ name_es: '', name_fi: '', slug: '', description_es: '', description_fi: '', seo: {} })
  const [loading, setLoading] = useState(false)
  useEffect(()=>{ if(id){ setLoading(true); fetch('/api/admin/destinations?id='+id).then(r=>r.json()).then(d=>{ setData(d); setLoading(false) }) } },[id])

  function setField(k:string, v:any){ setData((s:any)=>({ ...s, [k]: v })) }

  async function onSave(e:any){ e.preventDefault(); if(data.id){ await fetch('/api/admin/destinations', { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }) } else { const res = await fetch('/api/admin/destinations', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }); const j = await res.json(); window.location.href = `/admin/destinations/${j.id}` } }

  if(loading) return <div>Loading...</div>

  return (
    <form onSubmit={onSave} className="bg-white p-6 rounded shadow max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Name (ES)</label>
          <input className="w-full border p-2 rounded" value={data.name_es||''} onChange={e=>setField('name_es', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Name (FI)</label>
          <input className="w-full border p-2 rounded" value={data.name_fi||''} onChange={e=>setField('name_fi', e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm">Slug</label>
        <input className="w-full border p-2 rounded" value={data.slug||''} onChange={e=>setField('slug', e.target.value)} />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Description (ES)</label>
          <textarea rows={4} className="w-full border p-2 rounded" value={data.description_es||''} onChange={e=>setField('description_es', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Description (FI)</label>
          <textarea rows={4} className="w-full border p-2 rounded" value={data.description_fi||''} onChange={e=>setField('description_fi', e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm">Region</label>
        <input className="w-full border p-2 rounded" value={data.region||''} onChange={e=>setField('region', e.target.value)} />
      </div>
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-midnight text-snow rounded">Guardar</button>
        <a className="px-4 py-2 border rounded" href="/admin/destinations">Cancelar</a>
      </div>
    </form>
  )
}
