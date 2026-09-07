import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('id, slug, region, hero_image_url, status, destination_translations(language_code, name, short_description, full_description, highlights, travel_information), experiences(id)')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const destinations = (data || []).map((item: any) => ({
      id: item.id,
      slug: item.slug,
      region: item.region || '',
      heroImageUrl: item.hero_image_url || '',
      status: item.status,
      translations: item.destination_translations || [],
      experienceCount: Array.isArray(item.experiences) ? item.experiences.length : 0,
    }));

    return NextResponse.json({ destinations }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Supabase is not configured' }, { status: 503 });
  }
}
