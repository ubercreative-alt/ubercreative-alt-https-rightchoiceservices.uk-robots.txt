import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, Check, Mail, Phone, RefreshCw, Lock, Inbox, Users } from "lucide-react";
import { toast } from "sonner";
import Logo from "../components/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PASSCODE = "jkadmin2025"; // demo gate only

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("jk_admin") === "1");
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("enquiries");
  const [enquiries, setEnquiries] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [e, s] = await Promise.all([
        axios.get(`${API}/contact`),
        axios.get(`${API}/subscribers`),
      ]);
      setEnquiries(e.data);
      setSubs(s.data);
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const login = (e) => {
    e.preventDefault();
    if (pass === PASSCODE) {
      localStorage.setItem("jk_admin", "1");
      setAuthed(true);
    } else {
      toast.error("Incorrect passcode.");
    }
  };

  const markRead = async (id) => {
    try { await axios.patch(`${API}/contact/${id}/read`); setEnquiries((p) => p.map((x) => x.id === id ? { ...x, status: "read" } : x)); }
    catch { toast.error("Action failed."); }
  };
  const remove = async (id) => {
    try { await axios.delete(`${API}/contact/${id}`); setEnquiries((p) => p.filter((x) => x.id !== id)); toast.success("Enquiry deleted."); }
    catch { toast.error("Delete failed."); }
  };

  const fmt = (iso) => { try { return new Date(iso).toLocaleString("en-GB"); } catch { return iso; } };

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-ink px-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
          <div className="flex justify-center mb-6"><Logo /></div>
          <div className="flex items-center gap-2 text-ink font-heading font-bold text-xl"><Lock className="h-5 w-5 text-brand" /> Admin Access</div>
          <p className="text-sm text-mute mt-2">Enter the passcode to view enquiries.</p>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passcode" className="w-full mt-5 border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand" />
          <button type="submit" className="w-full mt-4 bg-brand hover:bg-brand-600 text-white py-3 rounded-xl font-semibold transition-colors">Enter</button>
          <Link to="/fixhome" className="block text-center text-sm text-mute mt-4 hover:text-brand">Back to website</Link>
        </form>
      </div>
    );
  }

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo light />
          <div className="flex items-center gap-3">
            <button onClick={load} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>
            <button onClick={() => { localStorage.removeItem("jk_admin"); setAuthed(false); }} className="bg-brand hover:bg-brand-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-heading font-extrabold text-ink text-3xl">Submissions Dashboard</h1>
        <div className="flex items-center gap-3 mt-6">
          <button onClick={() => setTab("enquiries")} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${tab === "enquiries" ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-black/5"}`}>
            <Inbox className="h-4 w-4" /> Enquiries <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">{enquiries.length}</span>
          </button>
          <button onClick={() => setTab("subscribers")} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${tab === "subscribers" ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-black/5"}`}>
            <Users className="h-4 w-4" /> Subscribers <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">{subs.length}</span>
          </button>
          {newCount > 0 && <span className="text-sm text-brand font-semibold">{newCount} new</span>}
        </div>

        {tab === "enquiries" && (
          <div className="mt-8 grid gap-4">
            {enquiries.length === 0 && <p className="text-mute">No enquiries yet.</p>}
            {enquiries.map((e) => (
              <div key={e.id} className={`rounded-2xl bg-white ring-1 p-6 ${e.status === "new" ? "ring-brand/40" : "ring-black/5"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-ink text-lg">{e.name}</span>
                      {e.status === "new" && <span className="text-xs bg-brand text-white px-2 py-0.5 rounded-full">NEW</span>}
                      {e.service && <span className="text-xs bg-cream text-ink px-2 py-0.5 rounded-full">{e.service}</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-mute">
                      <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1 hover:text-brand"><Mail className="h-4 w-4" />{e.email}</a>
                      {e.phone && <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1 hover:text-brand"><Phone className="h-4 w-4" />{e.phone}</a>}
                      <span>{fmt(e.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {e.status === "new" && <button onClick={() => markRead(e.id)} className="grid place-items-center h-9 w-9 rounded-full bg-cream text-ink hover:bg-brand hover:text-white transition-colors" title="Mark read"><Check className="h-4 w-4" /></button>}
                    <button onClick={() => remove(e.id)} className="grid place-items-center h-9 w-9 rounded-full bg-cream text-ink hover:bg-red-500 hover:text-white transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <p className="mt-4 text-ink/80 leading-relaxed">{e.message}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "subscribers" && (
          <div className="mt-8 rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
            {subs.length === 0 && <p className="text-mute p-6">No subscribers yet.</p>}
            {subs.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-6 py-4 border-b border-black/5 last:border-0">
                <a href={`mailto:${s.email}`} className="inline-flex items-center gap-2 text-ink hover:text-brand"><Mail className="h-4 w-4 text-brand" />{s.email}</a>
                <span className="text-sm text-mute">{fmt(s.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
