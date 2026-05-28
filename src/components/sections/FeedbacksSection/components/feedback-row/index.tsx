import { TestimonialCard } from "@/src/components/ui/testimonial-card";

interface FbItem {
  quote: string;
  person: string;
  role: string;
  initials: string;
}

interface FeedbackRowProps {
  items: FbItem[];
}

export function FeedbackRow({ items }: FeedbackRowProps) {
  return (
    <div className="fb-row">
      {items.map((fb) => (
        <TestimonialCard
          key={fb.person}
          quote={fb.quote}
          person={fb.person}
          role={fb.role}
          initials={fb.initials}
        />
      ))}
    </div>
  );
}
