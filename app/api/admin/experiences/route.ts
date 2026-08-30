import { NextRequest, NextResponse } from 'next/server'
import FileExperienceRepository from '../../../../src/repositories/FileExperienceRepository'

const repo = new FileExperienceRepository()
const ORG_ID = 'org-0001'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const slug = searchParams.get('slug')
  try {
    if (id) {
      const item = await repo.getById(id)
      return NextResponse.json(item)
    }
    if (slug) {
      const item = await repo.getBySlug(slug)
      return NextResponse.json(item)
    }
    const list = await repo.list(ORG_ID)
    return NextResponse.json(list)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.action === 'duplicate' && body.id) {
      const dup = await repo.duplicate(body.id)
      return NextResponse.json(dup)
    }
    if (body.action === 'delete' && body.id) {
      await repo.delete(body.id)
      return NextResponse.json({ ok: true })
    }
    // create
    const created = await repo.create({ ...body })
    return NextResponse.json(created)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const updated = await repo.update(body.id, body)
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
