import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY_FORM = { name: "", email: "", message: "" };

export const ContactForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you! Your message has been sent. We'll be in touch shortly.");
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Something went wrong sending your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
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
  );
};
