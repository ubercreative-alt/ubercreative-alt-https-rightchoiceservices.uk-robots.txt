import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const SOCIALS = [
  { label: "Facebook", Icon: Facebook },
  { label: "Twitter", Icon: Twitter },
  { label: "Youtube", Icon: Youtube },
  { label: "Instagram", Icon: Instagram },
];

export const SocialLinks = ({ variant = "plain" }) => (
  <div className="flex items-center gap-3" data-testid="social-links">
    {SOCIALS.map(({ label, Icon }) => (
      <a
        key={label}
        href="#home"
        aria-label={label}
        className={
          variant === "circle"
            ? "grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:bg-[var(--rc-lavender)] hover:text-[var(--rc-indigo-900)] hover:border-transparent transition-all"
            : "hover:text-white transition-colors"
        }
      >
        <Icon size={variant === "circle" ? 16 : 14} />
      </a>
    ))}
  </div>
);
