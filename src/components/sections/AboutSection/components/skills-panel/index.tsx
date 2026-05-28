import { useState } from "react";
import { useTranslations } from "next-intl";
import { SkillsRadarChart } from "@/src/components/sections/RadarChart";
import { TabBar } from "@/src/components/ui/tab-bar";

type Tab = "technical" | "stacks" | "relational";

const TAB_KEYS: Tab[] = ["technical", "stacks", "relational"];

export function SkillsPanel() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("technical");

  return (
    <div className="skills">
      <div className="skills__head">
        <h4 className="skills__title">{t("ceo.skills_title")}</h4>
        <TabBar
          tabs={TAB_KEYS.map((tab) => ({
            key: tab,
            label: t(`ceo.tab_${tab}`),
          }))}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as Tab)}
          className="skills__tabs"
        />
      </div>
      <div className="skills__radar">
        <SkillsRadarChart dataKey={activeTab} />
      </div>
    </div>
  );
}
