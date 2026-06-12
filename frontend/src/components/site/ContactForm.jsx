import { useState } from "react";
import { Send } from "lucide-react";
import { useSubmit } from "@/hooks/useSubmit";

const EMPTY_FORM = { name: "", email: "", message: "" };

const FIELDS = [
  { name: "name", type: "text", placeholder: "Your Name *", testId: "contact-name-input" },
  { name: "email", type: "email", placeholder: "Your Email *", testId: "contact-email-input" },
];

export const ContactForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const { sending, submit } = useSubmit({
    path: "/contact",
    successMessage: "Thank you! Your message has been sent. We'll be in touch shortly.",
    errorMessage: "Something went wrong sending your message. Please try again.",
  });

  const setField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form, () => setForm(EMPTY_FORM));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="contact-form" className="rounded-3xl bg-white p-8 lg:p-10 shadow-2xl">
      <h3 className="font-heading font-bold text-[var(--rc-ink)] text-xl">Send us a message</h3>
      <div className="mt-6 space-y-4">
        {FIELDS.map((field) => (
          <input
            key={field.name}
            data-testid={field.testId}
            required
            type={field.type}
            value={form[field.name]}
            onChange={setField(field.name)}
            placeholder={field.placeholder}
            className="rc-input"
          />
        ))}
        <textarea
          data-testid="contact-message-input"
          required
          rows={4}
          value={form.message}
          onChange={setField("message")}
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
