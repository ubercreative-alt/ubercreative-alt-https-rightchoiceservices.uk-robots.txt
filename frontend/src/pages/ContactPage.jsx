import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { brand } from "../mock";

const initial = { name: "", email: "", phone: "", service: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initial);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    toast.success("Message sent!", { description: `Thanks ${form.name}, our team will contact you shortly.` });
    setForm(initial);
  };

  const info = [
    { icon: MapPin, label: "Our Office", value: brand.address },
    { icon: Phone, label: "Call Us", value: brand.phone, href: `tel:${brand.phone}` },
    { icon: Mail, label: "Email Us", value: brand.email, href: `mailto:${brand.email}` },
    { icon: Clock, label: "Working Hours", value: brand.hours },
  ];

  return (
    <div className="bg-cream">
      <SiteHeader />
      <main>
        <PageHeader title="Contact Us" crumbs={["Contact"]} />
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <Reveal>
              <span className="inline-block text-brand font-semibold tracking-[0.2em] text-sm mb-4">GET IN TOUCH</span>
              <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-tight">Let's Discuss Your Renovation</h2>
              <p className="mt-5 text-mute text-[17px] leading-relaxed">Tell us about your project and we'll get back to you with a free, no-obligation quotation.</p>
              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                {info.map((it) => (
                  <div key={it.label} className="flex items-start gap-4 rounded-2xl bg-white ring-1 ring-black/5 p-5">
                    <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand/10 text-brand shrink-0"><it.icon className="h-6 w-6" /></span>
                    <div>
                      <div className="text-sm text-mute">{it.label}</div>
                      {it.href ? (
                        <a href={it.href} className="font-heading font-semibold text-ink hover:text-brand break-words">{it.value}</a>
                      ) : (
                        <div className="font-heading font-semibold text-ink">{it.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <form onSubmit={onSubmit} className="rounded-3xl bg-ink text-white p-8 md:p-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" className="bg-white/10 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40" />
                  <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email Address" className="bg-white/10 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40" />
                  <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone Number" className="bg-white/10 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40" />
                  <input name="service" value={form.service} onChange={onChange} placeholder="Service Needed" className="bg-white/10 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40" />
                </div>
                <textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell us about your project..." className="w-full mt-4 bg-white/10 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40 resize-none" />
                <button type="submit" className="mt-6 inline-flex items-center gap-3 bg-brand hover:bg-brand-600 text-white pl-6 pr-2 py-3 rounded-full font-semibold transition-colors group">
                  Send Message
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-white/20 group-hover:bg-white group-hover:text-brand transition-colors"><ArrowUpRight className="h-5 w-5" /></span>
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
