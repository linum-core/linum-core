import { TagPill } from "../tag-pill";

interface TagListProps {
  tags: string[];
  className?: string;
  itemClassName?: string;
}

export function TagList({
  tags,
  className = "comp-card__tags",
  itemClassName,
}: TagListProps) {
  return (
    <div className={className}>
      {tags.map((tag) => (
        <TagPill key={tag} label={tag} className={itemClassName} />
      ))}
    </div>
  );
}
