import React from 'react'
import BookingWidget from '../../../src/components/BookingWidget'

export default function AdminAvailabilityPage(){
  // Simple admin view linking to existing admin availability APIs (UI can be expanded)
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Availability (Admin)</h1>
        <a className="px-4 py-2 bg-midnight text-snow rounded" href="/admin/availability/new">New slot</a>
      </div>
      <div>
        <p className="text-sm text-slate">Use API endpoints to manage availability. Listing UI will be implemented next iteration.</p>
      </div>
    </div>
  )
}
