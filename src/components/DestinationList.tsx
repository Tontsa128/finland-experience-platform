'use client'
import React, { useEffect, useState } from 'react'

export default function DestinationList(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ fetch('/api/admin/destinations').then(r=>r.json()).then(setItems) },[])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Destinations</h1>
        <a className="px-4 py-2 bg-midnight text-snow rounded" href="/admin/destinations/new">New destination</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{it.name_es}</h3>
            <div className="text-sm text-slate">{it.region} · {it.best_season}</div>
            <div className="mt-2 flex gap-2">
              <a className="px-2 py-1 border rounded" href={`/admin/destinations/${it.id}`}>Editar</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
