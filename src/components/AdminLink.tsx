'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AdminLink() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(document.cookie.split('; ').some((cookie) => cookie.startsWith('demo_session='))), []);
  if (!visible) return null;
  return <Link href="/admin/destinos" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15"><ShieldCheck className="h-4 w-4" /><span className="hidden sm:inline">Hallinta</span></Link>;
}
