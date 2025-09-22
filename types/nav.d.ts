export interface NavItem {
    id: string;
    label: string;
    icon: any; 
    route: string;
}

export interface BottomNavProps {
    items: NavItem[];
    activeId: string;
    onSelect: (id: string, route: string) => void;
}