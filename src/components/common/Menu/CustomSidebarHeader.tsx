import { useNavigate } from "react-router-dom";

interface CustomSidebarHeaderProps {
  providerName: string;
  providerEmail: string;
}
export const CustomSidebarHeader = ({
  providerName,
  providerEmail,
}: CustomSidebarHeaderProps) => {
  const navigate = useNavigate();
  return (
    <button className="flex w-full items-center gap-2 pb-2 mb-6 mt-2 border-b border-gray-500" onClick={()=> navigate("/profile")}>
      <span className="flex h-8 w-8 items-center justify-center bg-muted rounded-lg">
        {providerName.split("").slice(0, 2).join("").toUpperCase()}
      </span>
      <div className="flex flex-col text-left text-sm">
        <span className="truncate font-semibold">{providerName}</span>
        <span>{providerEmail}</span>
      </div>
    </button>
  );
};
