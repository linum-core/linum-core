interface ContactChannelLinkProps {
  label: string;
  value: string;
  href: string;
  className?: string;
}

export function ContactChannelLink({
  label,
  value,
  href,
  className = "contact__link",
}: ContactChannelLinkProps) {
  return (
    <a href={href} className={className}>
      <span className="contact__label">{label}</span>
      <span className="contact__value">{value}</span>
      <span className="contact__arrow">↗</span>
    </a>
  );
}
