import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  url: string;
}

export const CustomSidebarMenu = ({ navItems }: { navItems: NavItem[] }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obter a localização atual
  
  return (
    <SidebarMenu>
      {navItems.map((item) => {
        // Verifica se a URL do item é igual ao caminho atual
        const isActive = location.pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className={`${
                isActive ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
              } transition duration-300 ease-in-out p-4 rounded min-h-[40px]`} // Aplicando as classes do Tailwind
              onClick={() => navigate(item.url)}
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
