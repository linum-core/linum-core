import { MonogramMark } from "@/src/components/ui/MonogramMark";
import { Enum_Sections } from "@/src/constants/enums";

interface ISideLogoProps {
  scrollTo: (id: Enum_Sections) => void;
}

export function SideLogo({ scrollTo }: ISideLogoProps) {
  return (
    <a
      className="nav__brand"
      href={`#${Enum_Sections.HERO}`}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(Enum_Sections.HERO);
      }}>
      <span className="nav__brand-mark">
        <MonogramMark size={42} />
      </span>
      <span className="nav__brand-word">
        Linum<span className="nav__brand-dot">·</span>Core
        <small>Est. 2024 · São Paulo</small>
      </span>
    </a>
  );
}
