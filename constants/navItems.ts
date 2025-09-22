import { NavItem } from "@/types/nav";

export const NAV_ITEMS: NavItem[] = [
    { 
        id: "home", 
        label: "Home", 
        icon: require("@/assets/images/home-icon.png"), 
        route: "/" 
    },
    { 
        id: "analysis", 
        label: "Analysis", 
        icon: require("@/assets/images/analysis-icon.png"), 
        route: "/analysis" 
    },
    { 
        id: "notes", 
        label: "Notes", 
        icon: require("@/assets/images/notes-icon.png"), 
        route: "/notes" 
    },
    { 
        id: "schedule", 
        label: "Schedule", 
        icon: require("@/assets/images/schedule-icon.png"), 
        route: "/schedule" 
    },
    { 
        id: "family", 
        label: "Family", 
        icon: require("@/assets/images/family-icon.png"), 
        route: "/family" 
    },
] as const;