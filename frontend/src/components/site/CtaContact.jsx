import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CtaContact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you! Your message has been sent. We'll be in touch shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong sending your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="bg-[var(--rc-paper)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative rounded-[2.5rem] bg-[var(--rc-indigo-800)] overflow-hidden">
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-white/[0.05]" />
          <div className="absolute left-10 -bottom-28 w-72 h-72 rounded-full bg-white/[0.05]" />

          <div className="relative grid lg:grid-cols-2 gap-12 p-10 lg:p-16 items-center">
            <div>
              <p className="rc-label text-[var(--rc-lavender)]">
                <span className="rc-label-line bg-[var(--rc-lavender)]" />
                Get Started Today
              </p>
              <h2 className="rc-h2 mt-4 text-white" data-testid="contact-title">
                Refer a young person to us today.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                If you're an agency or professional wanting to refer a young person to Right Choice
                Services Ltd, or you have any questions about the services we offer, please don't
                hesitate to get in touch.
              </p>
              <div className="mt-8 space-y-2 text-white/80 text-sm">
                <p data-testid="contact-phone">Tel: 01992 850277 &nbsp;·&nbsp; Mobile: 07830 107651</p>
                <p data-testid="contact-email">Email: info@rightchoiceservices.org</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} data-testid="contact-form" className="rounded-3xl bg-white p-8 lg:p-10 shadow-2xl">
              <h3 className="font-heading font-bold text-[var(--rc-ink)] text-xl">Send us a message</h3>
              <div className="mt-6 space-y-4">
                <input
                  data-testid="contact-name-input"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name *"
                  className="rc-input"
                />
                <input
                  data-testid="contact-email-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email *"
                  className="rc-input"
                />
                <textarea
                  data-testid="contact-message-input"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your Message *"
                  className="rc-input resize-none"
                />
              </div>
              <button type="submit" disabled={sending} data-testid="contact-submit-btn" className="rc-btn-pill w-full mt-6 justify-center disabled:opacity-60">
                {sending ? "Sending..." : "Send Message"} <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
