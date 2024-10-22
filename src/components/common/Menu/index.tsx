import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomSidebarHeader } from "./CustomSidebarHeader";
import { CustomSidebarMenu } from "./CustomSidebarMenu";
import useDevice from "@/hooks/useDevice";
import {
  LayoutDashboardIcon,
  MessagesSquareIcon,
  CalendarDaysIcon,
} from "lucide-react";

const navItems = [
  { title: "Calendar", icon: <CalendarDaysIcon />, url: "/" },
  { title: "Dashboard", icon: <LayoutDashboardIcon />, url: "/dashboard" },
  { title: "Requests", icon: <MessagesSquareIcon />, url: "/requests" },
];

export default function CustomSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useDevice();

  return (
    <SidebarProvider>
      <Sidebar
        collapsible={isMobile ? "icon" : "none"}
        className="min-w-[255px] p-2 h-screen"
      >
        <CustomSidebarHeader />
        <SidebarContent className="overflow-x-hidden">
          <CustomSidebarMenu navItems={navItems} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        {isMobile && (
          <header className="flex h-16 shrink-0 items-center justify-between gap-2">
            <SidebarTrigger className="-ml-1" />
          </header>
        )}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
