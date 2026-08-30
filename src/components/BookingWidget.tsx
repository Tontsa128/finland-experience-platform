'use client'
import React, { useEffect, useState } from 'react'

export default function BookingWidget({ experienceId }: { experienceId: string }) {
  const [date, setDate] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [addons, setAddons] = useState<any[]>([])
  const [price, setPrice] = useState<any>(null)
  const [message, setMessage] = useState('')

  async function calcPrice(){
    setMessage('')
    try{
      const res = await fetch('/api/pricing/calc', { method: 'POST', body: JSON.stringify({ experience_id: experienceId, date, adults, children, infants, addons }), headers: { 'Content-Type': 'application/json' } })
      const j = await res.json()
      if (j.error) throw new Error(j.error)
      setPrice(j)
    }catch(err:any){ setMessage('Error: '+err.message) }
  }

  async function createBooking(){
    setMessage('')
    try{
      const res = await fetch('/api/bookings', { method: 'POST', body: JSON.stringify({ experience_id: experienceId, availability_id: '', adults, children, infants, addons }), headers: { 'Content-Type': 'application/json' } })
      const j = await res.json()
      if (j.error) throw new Error(j.error)
      setMessage('Booking created: '+(j.booking?.id||''))
    }catch(err:any){ setMessage('Error: '+err.message) }
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-md">
      <h3 className="font-semibold mb-2">Booking</h3>
      <div className="mb-2">
        <label className="block text-sm">Date</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div>
          <label className="block text-sm">Adults</label>
          <input type="number" value={adults} onChange={e=>setAdults(parseInt(e.target.value||'0'))} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Children</label>
          <input type="number" value={children} onChange={e=>setChildren(parseInt(e.target.value||'0'))} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Infants</label>
          <input type="number" value={infants} onChange={e=>setInfants(parseInt(e.target.value||'0'))} className="w-full border p-2 rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={calcPrice} type="button" className="px-3 py-2 bg-midnight text-snow rounded">Calculate price</button>
        <button onClick={createBooking} type="button" className="px-3 py-2 border rounded">Book (mock)</button>
      </div>
      {price && (
        <div className="mt-3 text-sm">
          <div>Subtotal: {(price.subtotal_cents/100).toFixed(2)} €</div>
          <div>Tax: {(price.tax_cents/100).toFixed(2)} €</div>
          <div className="font-semibold">Total: {(price.total_cents/100).toFixed(2)} €</div>
        </div>
      )}
      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  )
}
