import { useState } from "react";
import { useSubmit } from "@/hooks/useSubmit";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const { sending, submit } = useSubmit({
    path: "/newsletter",
    successMessage: "Thank you for subscribing!",
    errorMessage: "Subscription failed. Please try again.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ email }, () => setEmail(""));
  };

  return (
    <form onSubmit={handleSubmit} className="flex rounded-full bg-white/10 border border-white/15 p-1.5" data-testid="newsletter-form">
      <input
        data-testid="newsletter-email-input"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 outline-none min-w-0"
      />
      <button
        type="submit"
        disabled={sending}
        data-testid="newsletter-submit-btn"
        className="rounded-full bg-gradient-to-r from-[var(--rc-lavender)] to-[var(--rc-indigo-500)] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white disabled:opacity-60"
      >
        {sending ? "..." : "Subscribe"}
      </button>
    </form>
  );
};
