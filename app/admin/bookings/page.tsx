import React, { useEffect, useState } from 'react'

export default function AdminBookingsPage(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ fetch('/api/admin/bookings').then(r=>r.json()).then(setItems) },[])

  async function onCancel(id:string){ if(!confirm('Cancel booking?')) return; await fetch('/api/bookings?id='+id, { method: 'DELETE' }); setItems(items.filter(i=>i.id!==id)) }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Bookings (Admin)</h1>
      </div>
      <div className="grid gap-3">
        {items.map(b=> (
          <div key={b.id} className="p-4 bg-white rounded shadow">
            <div className="font-semibold">Booking {b.id}</div>
            <div className="text-sm">Experience: {b.experience_id}</div>
            <div className="text-sm">Travelers: {b.travelers?.adults||0} / {b.travelers?.children||0}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>onCancel(b.id)} className="px-3 py-1 border rounded">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
