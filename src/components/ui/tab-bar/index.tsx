interface TabItem {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function TabBar({
  tabs,
  activeKey,
  onChange,
  className = "tab-bar",
}: TabBarProps) {
  return (
    <div className={className}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-bar__item${activeKey === tab.key ? " is-active" : ""}`}
          onClick={() => onChange(tab.key)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
