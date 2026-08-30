'use client'
import React, { useState, useEffect } from 'react'

interface Props { id?: string }

export default function ExperienceForm({ id }: Props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({ title_es: '', title_fi: '', slug: '', short_description_es: '', short_description_fi: '', description_es: '', description_fi: '', pricing: { adult: 0, currency: 'EUR' }, status: 'draft', media: [], hero_media_id: null })
  const [message, setMessage] = useState<string | null>(null)
  const [mediaList, setMediaList] = useState<any[]>([])

  useEffect(() => {
    fetchMediaList()
    if (id) {
      setLoading(true)
      fetch(`/api/admin/experiences?id=${id}`).then(r => r.json()).then(d => { setData(d); setLoading(false) }).catch(() => setLoading(false))
    }
  }, [id])

  async function fetchMediaList(){
    try{
      const res = await fetch('/api/admin/media')
      const j = await res.json()
      setMediaList(j || [])
    }catch{}
  }

  async function onSave(e:any){
    e.preventDefault()
    setMessage(null)
    try{
      if (data.id) {
        const res = await fetch('/api/admin/experiences', { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        const json = await res.json()
        setMessage('Guardado')
        setData(json)
      } else {
        const res = await fetch('/api/admin/experiences', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        const json = await res.json()
        setMessage('Creado')
        setData(json)
        window.location.href = `/admin/experiences/${json.id}`
      }
    }catch(err:any){
      setMessage('Error: ' + (err.message||err))
    }
  }

  function setField(k:string, v:any){ setData((s:any)=>({ ...s, [k]: v })) }

  function toggleMedia(mid:string){
    setData((s:any)=>{
      const arr = s.media || []
      if (arr.includes(mid)) return { ...s, media: arr.filter((x:string)=>x!==mid) }
      return { ...s, media: [...arr, mid] }
    })
  }

  function setHero(mid:string|null){ setData((s:any)=>({ ...s, hero_media_id: mid })) }

  if (loading) return <div>Cargando...</div>

  return (
    <form onSubmit={onSave} className="space-y-4 bg-white p-6 rounded shadow">
      {message && <div className="p-2 bg-emerald-100 text-emerald-800">{message}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Título (ES)</label>
          <input className="w-full border p-2 rounded" value={data.title_es||''} onChange={e=>setField('title_es', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Título (FI)</label>
          <input className="w-full border p-2 rounded" value={data.title_fi||''} onChange={e=>setField('title_fi', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-sm">Slug</label>
        <input className="w-full border p-2 rounded" value={data.slug||''} onChange={e=>setField('slug', e.target.value)} placeholder="ej: auroras-cristal-hielo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Descripción corta (ES)</label>
          <input className="w-full border p-2 rounded" value={data.short_description_es||''} onChange={e=>setField('short_description_es', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Descripción corta (FI)</label>
          <input className="w-full border p-2 rounded" value={data.short_description_fi||''} onChange={e=>setField('short_description_fi', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-sm">Descripción larga (ES)</label>
        <textarea className="w-full border p-2 rounded" rows={6} value={data.description_es||''} onChange={e=>setField('description_es', e.target.value)} />
      </div>

      <div>
        <label className="block text-sm">Galería de media</label>
        <div className="grid grid-cols-3 gap-3">
          {mediaList.map(m => (
            <div key={m.id} className={`p-2 border rounded ${ (data.media||[]).includes(m.id) ? 'ring-2 ring-aurora' : '' }`}>
              <img src={m.url} alt={m.alt_text} className="w-full h-24 object-cover rounded" />
              <div className="mt-2 text-sm">{m.title || m.filename}</div>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm"><input type="checkbox" checked={(data.media||[]).includes(m.id)} onChange={()=>toggleMedia(m.id)} /> Añadir</label>
                <label className="text-sm"><input type="radio" name="hero" checked={data.hero_media_id===m.id} onChange={()=>setHero(m.id)} /> Hero</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm">Adult price (€)</label>
          <input type="number" className="w-full border p-2 rounded" value={(data.pricing?.adult||0)/100} onChange={e=>setField('pricing', { ...data.pricing, adult: Math.round(parseFloat(e.target.value||'0')*100) })} />
        </div>
        <div>
          <label className="block text-sm">Child price (€)</label>
          <input type="number" className="w-full border p-2 rounded" value={(data.pricing?.child||0)/100} onChange={e=>setField('pricing', { ...data.pricing, child: Math.round(parseFloat(e.target.value||'0')*100) })} />
        </div>
        <div>
          <label className="block text-sm">Currency</label>
          <input className="w-full border p-2 rounded" value={data.pricing?.currency||'EUR'} onChange={e=>setField('pricing', { ...data.pricing, currency: e.target.value })} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm">Status</label>
        <select value={data.status} onChange={e=>setField('status', e.target.value)} className="border p-2 rounded">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-midnight text-snow rounded">Guardar</button>
        {data.id && (
          <button type="button" onClick={async ()=>{
            if(!confirm('Duplicar experiencia?')) return
            const res = await fetch('/api/admin/experiences', { method: 'POST', body: JSON.stringify({ action: 'duplicate', id: data.id }), headers: { 'Content-Type': 'application/json' } })
            const j = await res.json()
            window.location.href = `/admin/experiences/${j.id}`
          }} className="px-4 py-2 border rounded">Duplicar</button>
        )}
      </div>
    </form>
  )
}
