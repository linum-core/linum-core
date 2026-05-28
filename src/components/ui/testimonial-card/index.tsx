import { InitialsAvatar } from "../initials-avatar";

interface TestimonialCardProps {
  quote: string;
  person: string;
  role: string;
  initials: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  person,
  role,
  initials,
  className = "fb-card",
}: TestimonialCardProps) {
  return (
    <article className={className}>
      <div className="fb-card__mark">"</div>
      <p className="fb-card__quote">{quote}</p>
      <div className="fb-card__meta">
        <InitialsAvatar initials={initials} />
        <div>
          <div className="fb-card__person">{person}</div>
          <div className="fb-card__role">{role}</div>
        </div>
      </div>
    </article>
  );
}
