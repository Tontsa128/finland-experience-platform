import ExperienceForm from '../../../../../src/components/ExperienceForm'

interface Props { params: { id: string } }

export default function EditExperiencePage({ params }: Props){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Editar experiencia</h1>
      <ExperienceForm id={params.id} />
    </div>
  )
}
