import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  url: string;
}

export const CustomSidebarMenu = ({ navItems }: { navItems: NavItem[] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarMenu className="space-y-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.url;

        return (
          <SidebarMenuItem key={item.title} className="w-full">
            <SidebarMenuButton
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition duration-300 ease-in-out ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
              onClick={() => navigate(item.url)}
            >
              <div className="text-xl">{item.icon}</div>
              <span className="text-sm font-semibold">{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
