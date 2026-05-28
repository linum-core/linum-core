interface InitialsAvatarProps {
  initials: string;
  className?: string;
}

export function InitialsAvatar({
  initials,
  className = "fb-card__avatar",
}: InitialsAvatarProps) {
  return <div className={className}>{initials}</div>;
}
