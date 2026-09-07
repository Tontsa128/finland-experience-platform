import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const LANGUAGES = ['fi', 'es', 'en'] as const;

type DestinationPayload = {
  slug: string;
  region: string;
  heroImageUrl: string;
  status?: 'draft' | 'published';
  translations: Record<string, { name: string; shortDescription?: string; fullDescription?: string; highlights?: string; travelInformation?: string }>;
};

function validatePayload(body: DestinationPayload) {
  const errors: string[] = [];
  if (!body.slug?.trim()) errors.push('slug is required');
  if (!body.region?.trim()) errors.push('region is required');
  if (!body.heroImageUrl?.trim()) errors.push('heroImageUrl is required');
  for (const lang of LANGUAGES) {
    if (!body.translations?.[lang]?.name?.trim()) errors.push(`${lang} name is required`);
  }
  return errors;
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('id, slug, region, hero_image_url, status, published_at, created_at, updated_at, destination_translations(language_code, name, short_description, full_description, highlights, travel_information)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ destinations: data || [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Supabase is not configured' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DestinationPayload;
    const errors = validatePayload(body);
    if (errors.length) return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });

    const status = body.status === 'published' ? 'published' : 'draft';
    const { data: destination, error: destinationError } = await supabaseAdmin
      .from('destinations')
      .insert({ slug: body.slug.trim(), region: body.region.trim(), hero_image_url: body.heroImageUrl.trim(), status, published_at: status === 'published' ? new Date().toISOString() : null })
      .select('id, slug, region, hero_image_url, status, published_at')
      .single();
    if (destinationError) return NextResponse.json({ error: destinationError.message }, { status: 400 });

    const translations = LANGUAGES.map((language_code) => ({
      destination_id: destination.id,
      language_code,
      name: body.translations[language_code].name.trim(),
      short_description: body.translations[language_code].shortDescription?.trim() || null,
      full_description: body.translations[language_code].fullDescription?.trim() || null,
      highlights: body.translations[language_code].highlights?.trim() || null,
      travel_information: body.translations[language_code].travelInformation?.trim() || null,
    }));
    const { error: translationError } = await supabaseAdmin.from('destination_translations').insert(translations);
    if (translationError) {
      await supabaseAdmin.from('destinations').delete().eq('id', destination.id);
      return NextResponse.json({ error: translationError.message }, { status: 400 });
    }

    return NextResponse.json({ destination }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as DestinationPayload & { id: number };
    if (!body.id) return NextResponse.json({ error: 'id is required' }, { status: 400 });
    const errors = validatePayload(body);
    if (errors.length) return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    const status = body.status === 'published' ? 'published' : 'draft';
    const { data: destination, error } = await supabaseAdmin.from('destinations').update({ slug: body.slug.trim(), region: body.region.trim(), hero_image_url: body.heroImageUrl.trim(), status, published_at: status === 'published' ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq('id', body.id).select('id, slug, region, hero_image_url, status, published_at').single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    for (const language_code of LANGUAGES) {
      const value = body.translations[language_code];
      const { error: translationError } = await supabaseAdmin.from('destination_translations').upsert({ destination_id: body.id, language_code, name: value.name.trim(), short_description: value.shortDescription?.trim() || null, full_description: value.fullDescription?.trim() || null, highlights: value.highlights?.trim() || null, travel_information: value.travelInformation?.trim() || null, updated_at: new Date().toISOString() }, { onConflict: 'destination_id,language_code' });
      if (translationError) return NextResponse.json({ error: translationError.message }, { status: 400 });
    }
    return NextResponse.json({ destination });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(new URL(req.url).searchParams.get('id'));
    if (!Number.isFinite(id)) return NextResponse.json({ error: 'id is required' }, { status: 400 });
    const { error } = await supabaseAdmin.from('destinations').update({ deleted_at: new Date().toISOString(), status: 'draft', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Supabase is not configured' }, { status: 503 });
  }
}
