'use client'
import React from 'react'

export default function ExperienceList({ items }: { items: any[] }) {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{item.title_es} <span className="text-sm text-slate">({item.status})</span></h3>
            <div className="text-sm text-slate">{item.short_description_es}</div>
          </div>
          <div className="flex gap-2">
            <a className="px-3 py-1 border rounded text-sm" href={`/admin/experiences/${item.id}`}>Editar</a>
            <form method="post" action="/api/admin/experiences">
              <input type="hidden" name="action" value="duplicate" />
              <input type="hidden" name="id" value={item.id} />
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
