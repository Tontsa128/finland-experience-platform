import { NextRequest, NextResponse } from 'next/server'
import FileMediaRepository from '../../../../src/repositories/FileMediaRepository'

const repo = new FileMediaRepository()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  try {
    if (id) {
      const item = await repo.getById(id)
      if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(item)
    }
    const list = await repo.list()
    return NextResponse.json(list)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Validation
    if (!body.filename) return NextResponse.json({ error: 'filename required' }, { status: 400 })
    if (!body.url) return NextResponse.json({ error: 'url required' }, { status: 400 })
    if (!body.type) return NextResponse.json({ error: 'type required' }, { status: 400 })
    const created = await repo.create(body)
    return NextResponse.json(created)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const updated = await repo.update(body.id, body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await repo.delete(id)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.action === 'reorder' && Array.isArray(body.ids)) {
      const res = await repo.reorder(body.ids)
      return NextResponse.json(res)
    }
    if (body.action === 'set_hero' && body.id) {
      // ensure only one hero per experience is set later; here just update flag
      const updated = await repo.update(body.id, { is_hero: !!body.value })
      return NextResponse.json(updated)
    }
    return NextResponse.json({ error: 'unknown action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
