
export interface ISidebarMenuItem {
    title: string;
    url: string;
    icon: React.ReactNode;
};

export interface ISidebarMenuSection {
    title: string;
    url: string;
    items: ISidebarMenuItem[];
};