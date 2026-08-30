import DestinationForm from '../../../../../src/components/DestinationForm'

interface Props{ params: { id: string } }

export default function EditDestinationPage({ params }: Props){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Editar destination</h1>
      <DestinationForm id={params.id} />
    </div>
  )
}
