import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Calendário", icon: <CalendarDaysIcon />, url: "/" },
  { title: "Dashboard", icon: <LayoutDashboardIcon />, url: "/dashboard" },
  { title: "Solicitações", icon: <MessagesSquareIcon />, url: "/requests" },
];

export default function CustomSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useDevice();
  const useAuth = useContext(UserContext);
  const { provider, logout } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar
        collapsible={isMobile ? "icon" : "none"}
        className="min-w-[255px] p-4 h-screen bg-gray-800 text-gray-100 shadow-lg border-r border-gray-700 h-screen"
      >
        <CustomSidebarHeader
          providerName={provider?.name ?? "nome"}
          providerEmail={provider?.email ?? "teste@gmail.com"}
        />
        <SidebarContent className="overflow-x-hidden mt-4">
          <CustomSidebarMenu navItems={navItems} />
        </SidebarContent>
        <SidebarFooter className="mt-auto p-2">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 ease-in-out"
            onClick={logout}
          >
            Sair
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {isMobile && (
          <header className="flex h-16 items-center justify-between gap-2 bg-gray-900 px-4 shadow-md">
            <SidebarTrigger className="-ml-1 text-gray-100" />
          </header>
        )}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
