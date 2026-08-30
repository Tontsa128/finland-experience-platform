import { NextRequest, NextResponse } from 'next/server'
import FileAvailabilityRepository from '../../../../src/repositories/FileAvailabilityRepository'

const repo = new FileAvailabilityRepository()

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const exp = searchParams.get('experience_id')
  try{
    if (id) {
      const item = await repo.getById(id)
      if(!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(item)
    }
    const list = await repo.list(exp || undefined)
    return NextResponse.json(list)
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest){
  try{
    const body = await req.json()
    const created = await repo.create(body)
    return NextResponse.json(created)
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest){
  try{
    const body = await req.json()
    if(!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const updated = await repo.update(body.id, body)
    return NextResponse.json(updated)
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest){
  try{
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if(!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await repo.delete(id)
    return NextResponse.json({ ok: true })
  }catch(err:any){
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
