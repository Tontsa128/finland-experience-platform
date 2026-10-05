"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type UserRow = {
  id: string; email?: string | null; fullName?: string | null; role: string;
  emailConfirmedAt?: string | null; invitedAt?: string | null; lastSignInAt?: string | null;
  createdAt: string; bannedUntil?: string | null;
};

const roles = [
  ["SUPER_ADMIN", "Pääkäyttäjä", "Kaikki hallintaoikeudet"],
  ["ADMIN", "Ylläpitäjä", "Laajat ylläpito-oikeudet"],
  ["CONTENT_MANAGER", "Sisällönhallinta", "Sisältö, kuvat ja sivut"],
  ["BOOKING_MANAGER", "Varausten hallinta", "Yhteydenotot ja varausdata"],
  ["EDITOR", "Editor", "Hallinta-alueen lukuoikeus"],
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [email, setEmail] = useState("toni.jukka4@gmail.com");
  const [fullName, setFullName] = useState("Toni Jukka");
  const [role, setRole] = useState("SUPER_ADMIN");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await response.json();
    if (response.ok) { setUsers(data.users ?? []); setCurrentUserId(data.currentUserId ?? ""); }
    else setMessage(data.error ?? "Käyttäjiä ei voitu ladata.");
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function invite(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage("");
    const response = await fetch("/api/admin/users", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName, role }),
    });
    const data = await response.json();
    setMessage(response.ok
      ? `Kutsu lähetetty osoitteeseen ${data.email}. Käyttäjän pitää avata sähköpostin kutsulinkki ja viimeistellä kirjautuminen.`
      : (data.error ?? "Kutsua ei voitu lähettää."));
    if (response.ok) await load();
    setSaving(false);
  }

  async function changeRole(userId: string, nextRole: string) {
    setSaving(true); setMessage("");
    const response = await fetch("/api/admin/users", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: nextRole }),
    });
    const data = await response.json();
    setMessage(response.ok ? "Rooli päivitetty." : (data.error ?? "Roolia ei voitu päivittää."));
    if (response.ok) await load();
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="text-sm font-semibold text-emerald-700">← Hallinnan etusivu</Link>
        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">FINNEXPRIENCE · Käyttäjät</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Käyttäjät ja käyttöoikeudet</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Kutsu käyttäjä sähköpostilla. Supabase lähettää vahvistus-/kutsulinkin, ja rooli tallennetaan vastaavalle profiilille.</p>
        </div>

        <form onSubmit={invite} className="mt-8 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Kutsu uusi käyttäjä</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">Nimi<input value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="text-sm font-medium text-slate-700">Sähköposti<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="text-sm font-medium text-slate-700">Rooli<select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full rounded-xl border p-3">{roles.map(([value,label]) => <option key={value} value={value}>{label} — {roles.find(r => r[0] === value)?.[2]}</option>)}</select></label>
          </div>
          <button disabled={saving} className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{saving ? "Lähetetään…" : "Lähetä vahvistuskutsu"}</button>
          {message && <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">{message}</p>}
        </form>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Nykyiset käyttäjät</h2>
          {loading ? <p className="mt-4 text-sm text-slate-500">Ladataan…</p> : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead><tr className="border-b text-slate-500"><th className="px-3 py-3">Käyttäjä</th><th className="px-3 py-3">Rooli</th><th className="px-3 py-3">Vahvistettu</th><th className="px-3 py-3">Viimeksi kirjautunut</th></tr></thead>
                <tbody>{users.map(user => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="px-3 py-4"><div className="font-semibold text-slate-900">{user.fullName || "—"}</div><div className="text-slate-500">{user.email}</div>{user.id === currentUserId && <span className="text-xs font-semibold text-emerald-700">Sinä</span>}</td>
                    <td className="px-3 py-4">
                      <select value={user.role} disabled={saving || user.id === currentUserId} onChange={e => void changeRole(user.id, e.target.value)} className="rounded-lg border px-2 py-2">
                        {roles.map(([value,label]) => <option key={value} value={value}>{label}</option>)}
                        <option value="CUSTOMER">Asiakas</option>
                      </select>
                    </td>
                    <td className="px-3 py-4">{user.emailConfirmedAt ? "✓ Vahvistettu" : user.invitedAt ? "Kutsu lähetetty" : "Ei vahvistettu"}</td>
                    <td className="px-3 py-4">{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString("fi-FI") : "Ei vielä"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
