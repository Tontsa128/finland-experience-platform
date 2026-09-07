import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('id, slug, region, hero_image_url, status, destination_translations(language_code, name, short_description, full_description, highlights, travel_information), experiences(id, slug, experience_translations(language_code, title, short_description))')
      .eq('slug', params.slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Destination not found' }, { status: 404 });

    const translations = data.destination_translations || [];
    const byLanguage = (language: string) => translations.find((item: any) => item.language_code === language);
    const experiences = (data.experiences || []).map((experience: any) => {
      const expEs = experience.experience_translations?.find((item: any) => item.language_code === 'es');
      const expFi = experience.experience_translations?.find((item: any) => item.language_code === 'fi');
      return { id: experience.id, slug: experience.slug, titleEs: expEs?.title || '', titleFi: expFi?.title || '', shortDescriptionEs: expEs?.short_description || '', shortDescriptionFi: expFi?.short_description || '' };
    });

    return NextResponse.json({
      id: data.id,
      slug: data.slug,
      region: data.region || '',
      heroImageUrl: data.hero_image_url || '',
      nameEs: byLanguage('es')?.name || '',
      nameFi: byLanguage('fi')?.name || '',
      nameEn: byLanguage('en')?.name || '',
      shortDescriptionEs: byLanguage('es')?.short_description || '',
      shortDescriptionFi: byLanguage('fi')?.short_description || '',
      shortDescriptionEn: byLanguage('en')?.short_description || '',
      fullDescriptionEs: byLanguage('es')?.full_description || '',
      fullDescriptionFi: byLanguage('fi')?.full_description || '',
      fullDescriptionEn: byLanguage('en')?.full_description || '',
      highlightsEs: byLanguage('es')?.highlights || '',
      highlightsFi: byLanguage('fi')?.highlights || '',
      highlightsEn: byLanguage('en')?.highlights || '',
      travelInformationEs: byLanguage('es')?.travel_information || '',
      travelInformationFi: byLanguage('fi')?.travel_information || '',
      travelInformationEn: byLanguage('en')?.travel_information || '',
      experiences,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Supabase is not configured' }, { status: 503 });
  }
}
