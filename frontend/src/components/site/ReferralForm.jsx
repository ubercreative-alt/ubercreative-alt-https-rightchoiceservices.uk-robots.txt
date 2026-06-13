import { useState } from "react";
import { Send } from "lucide-react";
import { useSubmit } from "@/hooks/useSubmit";
import { REFERRALS_PAGE } from "@/data/content";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  service_area: "",
  details: "",
  gdpr_consent: false,
};

const ContactFields = ({ form, onChange }) => (
  <>
    <div className="grid sm:grid-cols-2 gap-4">
      <input data-testid="referral-name-input" required value={form.name} onChange={onChange("name")} placeholder="Your Name *" className="rc-input" />
      <input data-testid="referral-email-input" required type="email" value={form.email} onChange={onChange("email")} placeholder="Your Email *" className="rc-input" />
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <input data-testid="referral-phone-input" required type="tel" value={form.phone} onChange={onChange("phone")} placeholder="Your Phone *" className="rc-input" />
      <input data-testid="referral-organisation-input" value={form.organisation} onChange={onChange("organisation")} placeholder="Organisation / Local Authority" className="rc-input" />
    </div>
  </>
);

const ServiceAreaSelect = ({ value, onChange }) => (
  <select
    data-testid="referral-area-select"
    value={value}
    onChange={onChange("service_area")}
    className="rc-input appearance-none cursor-pointer"
  >
    <option value="">Preferred Service Area (optional)</option>
    {REFERRALS_PAGE.areas.map((area) => (
      <option key={area} value={area}>{area}</option>
    ))}
  </select>
);

const DetailsField = ({ value, onChange }) => (
  <textarea
    data-testid="referral-details-input"
    required
    rows={6}
    value={value}
    onChange={onChange("details")}
    placeholder="Individual Details * — tell us about the young person: age, current situation, support needs and timescales"
    className="rc-input resize-none"
  />
);

const GdprConsent = ({ checked, onToggle }) => (
  <label className="flex items-start gap-3 text-sm text-[var(--rc-ink-soft)] cursor-pointer">
    <input
      data-testid="referral-gdpr-checkbox"
      type="checkbox"
      required
      checked={checked}
      onChange={onToggle}
      className="mt-1 w-4 h-4 accent-[var(--rc-indigo-600)]"
    />
    <span>I consent to the collection &amp; processing of my data for the purpose of this referral. *</span>
  </label>
);

export const ReferralForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const { sending, submit } = useSubmit({
    path: "/referrals",
    successMessage: "Thank you! Your referral has been submitted. Our team will be in touch shortly.",
    errorMessage: "Something went wrong submitting your referral. Please try again.",
  });

  const setField = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const toggleConsent = (e) => setForm({ ...form, gdpr_consent: e.target.checked });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form, () => setForm(EMPTY_FORM));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="referral-form" className="rounded-3xl bg-white p-8 lg:p-10 shadow-2xl shadow-[var(--rc-indigo-900)]/10">
      <h3 className="font-heading font-bold text-[var(--rc-ink)] text-xl">Referral Form</h3>
      <div className="mt-6 space-y-4">
        <ContactFields form={form} onChange={setField} />
        <ServiceAreaSelect value={form.service_area} onChange={setField} />
        <DetailsField value={form.details} onChange={setField} />
        <GdprConsent checked={form.gdpr_consent} onToggle={toggleConsent} />
      </div>
      <button type="submit" disabled={sending} data-testid="referral-submit-btn" className="rc-btn-pill w-full mt-6 justify-center disabled:opacity-60">
        {sending ? "Submitting..." : "Submit Referral"} <Send size={15} />
      </button>
    </form>
  );
};
