import { NavItem } from "@/types/nav";

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: require("@/assets/passiveIconNavBottom/passiveHomeIcon.png"),
    activeIcon: require("@/assets/activeIcon/homeActiveIcon.png"),
    route: "/",
  },
  {
    id: "analysis",
    label: "Analysis",
    icon: require("@/assets/passiveIconNavBottom/passiveAnalysisIcon.png"),
    activeIcon: require("@/assets/activeIcon/analysisActiveIcon.png"),
    route: "/analysis/analysis",
  },
  {
    id: "notes",
    label: "Notes",
    icon: require("@/assets/activeIcon/notesActiveIcon.png"),
    activeIcon: require("@/assets/activeIcon/notesActiveIcon.png"),
    route: "/hcd/diary/createDiary",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: require("@/assets/passiveIconNavBottom/passiveScheduleIcon.png"),
    activeIcon: require("@/assets/activeIcon/scheduleActiveIcon.png"),
    route: "/meditrack/MediTrack",
  },
  {
    id: "family",
    label: "Family",
    icon: require("@/assets/passiveIconNavBottom/passiveFamilyIcon.png"),
    activeIcon: require("@/assets/activeIcon/familyActiveIcon.png"),
    route: "/family-mode/familyMode",
  },
] as const;
