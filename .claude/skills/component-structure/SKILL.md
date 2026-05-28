# Component Structure Classification Guide

This skill documents the classification rules and patterns for organizing components in this project. Use it when creating new components or refactoring existing ones to maintain consistency.

## Component Classification

### GLOBAL Components (`src/components/ui/<component-name>/`)

**Purpose:** Reusable visual elements with no business logic or i18n.

**Rules:**
- No `useTranslations()` — accept all strings via props
- No section-specific logic or styling
- Generic props (type, color, size, label, value, etc.)
- Can be used in any section or context
- Examples: TagPill, StatItem, FilterChip, TabBar, TestimonialCard, InitialsAvatar

**When to use:**
- Element appears in 2+ sections
- Element is purely presentational
- No i18n needed (copy passed as props)
- No state except UI state (active tab, hover, etc.)

### LOCAL Components (`src/components/sections/<SectionName>/components/<component-name>/`)

**Purpose:** Section-scoped elements with business logic, i18n, or section state.

**Rules:**
- Can use `useTranslations()` for section-specific strings
- Can access section-level state or hooks
- Builds on global components when appropriate
- Not exported outside the section
- Kept close to their usage context
- Examples: HeroBackground, CompCard, ProjectCard, PortraitFrame, ContactGrid

**When to use:**
- Element is specific to one section
- Element needs i18n strings from that section's namespace
- Element manages section-level state
- Element orchestrates multiple globals for a section

## Naming Conventions

### Global Components
- **kebab-case** folder name: `tag-pill`, `filter-chip`, `stats-row`
- **PascalCase** export: `export function TagPill()`
- **Singular** unless it's a container: `TagPill` (not TagPills), `TabBar`, `FilterBar`

### Local Components
- **kebab-case** folder name: `comp-card`, `hero-background`, `manifesto-quote`
- **PascalCase** export: `export function CompCard()`, `export function HeroBackground()`
- **Descriptive prefix** when tied to section: `hero-*`, `comp-*`, `project-*`, `contact-*`

### Containers
- Plural or `-row`/`-bar`/`-grid` suffix: `StatsRow`, `FilterBar`, `TagList`, `ContactGrid`
- Accept `items` or `children` prop, map over them
- Pure containers (no logic beyond mapping and rendering)

## File Structure

Every component follows this structure:

```
src/components/
├── ui/
│   └── tag-pill/
│       └── index.tsx          # export function TagPill(props)
└── sections/
    └── HeroSection/
        ├── index.tsx          # Section orchestrator
        └── components/
            ├── hero-background/
            │   └── index.tsx  # Local component
            └── hero-cta-button/
                └── index.tsx  # Local component
```

**One component per folder.** If a component is shared by multiple sections, move it to `ui/`.

## Props Pattern

### Global Components

```typescript
interface TagPillProps {
  label: string;
  color?: "blue" | "red" | "neutral";
  size?: "sm" | "md";
}

export function TagPill({ label, color = "neutral", size = "md" }: TagPillProps) {
  // No useTranslations(), no section state
  // Renders: label (from props), applies color and size classes
}
```

### Local Components

```typescript
interface CompCardProps {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  bodyKey: string;
  tags: string[];
  color: string;
  index: number;
}

export function CompCard({ icon: Icon, titleKey, bodyKey, tags, color, index }: CompCardProps) {
  const t = useTranslations();
  // Uses useTranslations() to resolve titleKey and bodyKey
  // Maps tags to global TagPill components
  // Section-specific styling via color and index
}
```

## Before/After Examples

### Bad: Mixed Concerns (Global + Section Logic)

```typescript
// ❌ DON'T: This goes in global but has i18n
function ProjectCard({ projectKey }: { projectKey: string }) {
  const t = useTranslations();
  return <div>{t(`projects.${projectKey}.title`)}</div>;
}
```

**Issue:** Can't be reused with hardcoded i18n. Copy isn't from props.

**Fix:** Extract to local component in PortfolioSection. Global should accept `title` prop.

### Good: Separation of Concerns

```typescript
// ✅ GLOBAL: Pure rendering, no i18n
function ProjectCard({ title, description, tags, links }: ProjectCardProps) {
  return (
    <article className="proj">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tags">{tags.map((t) => <TagPill key={t} label={t} />)}</div>
      <div className="links">{links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</div>
    </article>
  );
}

// ✅ LOCAL (in PortfolioSection/components/): Orchestrates globals
function ProjectCardLocal({ item, hue }: { item: ProjectItem; hue: number }) {
  const t = useTranslations();
  return (
    <ProjectCard
      title={item.title}
      description={t.raw(`projects.${item.key}.desc`) as string}
      tags={item.tags}
      links={item.links}
    />
  );
}
```

**Why this works:** Global is reusable everywhere. Local handles i18n and project data mapping.

### Bad: Monolithic Section

```typescript
// ❌ 200+ lines in one file, no sub-structure
export function PortfolioSection() {
  // All rendering, filtering, sorting, data mapping inline
  // Hard to test, hard to refactor
}
```

**Issue:** Too much responsibility. Mixing orchestration with rendering.

### Good: Decomposed Section

```typescript
// ✅ Clean orchestration
export function PortfolioSection() {
  const t = useTranslations();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? PROJECTS.filter(p => p.tags.includes(activeTag)) : PROJECTS;

  return (
    <section>
      <FilterBar tags={getAllTags()} onChange={setActiveTag} />
      <FeaturedProject item={PROJECTS[0]} />
      <div className="grid">
        {filtered.map((p) => <ProjectCard key={p.id} item={p} />)}
      </div>
    </section>
  );
}

// Local handles the detail rendering
function ProjectCard({ item }: { item: ProjectItem }) {
  const t = useTranslations();
  return /* ... */;
}
```

**Why this works:** Section is ~30 lines, clear data flow. ProjectCard handles its own rendering.

## Deciding: Global or Local?

| Question | Answer | Verdict |
|----------|--------|---------|
| Used in 2+ sections? | Yes | **GLOBAL** |
| Needs i18n? | Yes + Section-specific | **LOCAL** |
| Is a pure container (map + render)? | Yes | Depends: if generic, **GLOBAL**; if section-specific structure, **LOCAL** |
| Has complex internal state? | Yes | **LOCAL** (unless state is UI-only, like activeTab) |
| Example: StatItem appears only in HeroSection | Yes | **LOCAL** to HeroSection, not GLOBAL |
| Example: TagPill appears in CompetenciesSection and PortfolioSection | Yes | **GLOBAL** (reused) |
| Example: Button used everywhere for various CTAs | Yes | **GLOBAL** (ButtonComponent in ui/) |

## Migration Checklist

When extracting a component:

- [ ] Identify component boundaries (what props does it need?)
- [ ] Check: Used in 1 section or 2+?
- [ ] If 2+: Create in `src/components/ui/`
- [ ] If 1: Create in `src/components/sections/<SectionName>/components/`
- [ ] Remove i18n strings from global components; pass strings as props
- [ ] Keep i18n in local or section for section-scoped strings
- [ ] Update parent imports (section or app-level)
- [ ] Verify build: `bun build`
- [ ] Check visual: dev server, all sections render identical to before

## Real Examples from This Project

### ✅ Global: TabBar
- Used in: AboutSection (SkillsPanel)
- Props: `tabs` (key + label), `activeKey`, `onChange`
- No i18n in component; labels come from parent
- Can be reused anywhere tabs are needed

### ✅ Local: CompCard
- Used in: CompetenciesSection only
- Props: `icon`, `titleKey`, `bodyKey`, `tags`, `color`, `index`
- Uses `useTranslations()` to resolve keys
- Maps `tags` to global `TagPill` components
- Can't be reused (expects i18n keys from that section)

### ✅ Local: ManifestoQuote
- Used in: ManifestoSection only
- Props: `tokens` (from i18n), `wordProgress` (scroll-driven)
- Handles complex word-by-word animation logic
- Not reusable; tightly bound to that section's scroll behavior

### ✅ Global: TestimonialCard
- Used in: FeedbacksSection and potentially other sections
- Props: `quote`, `person`, `role`, `initials`
- Pure rendering; all copy is props
- Reusable everywhere feedback is shown
