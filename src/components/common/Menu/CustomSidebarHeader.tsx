import { SidebarHeader } from "@/components/ui/sidebar";

export const CustomSidebarHeader = () => (
  <SidebarHeader>
    <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
      <div className="grid flex-1 text-left text-sm leading-tight">
        {/* Adicione um logotipo ou título aqui */}
      </div>
    </div>
  </SidebarHeader>
);
