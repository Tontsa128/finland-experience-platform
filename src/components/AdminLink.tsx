"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(async ({ data }) => {
      if (!mounted || !data.user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      if (mounted && profile?.role) setVisible(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (!session?.user) {
        setVisible(false);
        return;
      }
      setVisible(true);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15"
    >
      <ShieldCheck className="h-4 w-4" />
      <span className="hidden sm:inline">Hallinta</span>
    </Link>
  );
}
