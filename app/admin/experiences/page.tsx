import React from 'react'
import ExperienceList from '../../../src/components/ExperienceList'

export default function AdminExperiencesPage(){
  const [items, setItems] = React.useState<any[]>([])
  React.useEffect(()=>{ fetch('/api/admin/experiences').then(r=>r.json()).then(setItems) },[])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Experiencias</h1>
        <a className="px-4 py-2 bg-midnight text-snow rounded" href="/admin/experiences/new">Nueva experiencia</a>
      </div>
      <ExperienceList items={items} />
    </div>
  )
}
