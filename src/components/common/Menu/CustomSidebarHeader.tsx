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
    <button
      className="flex w-full items-center gap-4 py-4 mb-6 mt-2 border-b border-gray-600 transition duration-200 ease-in-out hover:bg-gray-700 rounded-lg"
      onClick={() => navigate("/profile")}
    >
      <span className="flex h-10 w-10 items-center justify-center bg-indigo-600 text-white rounded-lg font-bold text-lg">
        {providerName.slice(0, 2).toUpperCase()}
      </span>
      <div className="flex flex-col text-left text-sm text-gray-300">
        <span className="truncate font-semibold text-white">{providerName}</span>
        <span className="text-gray-400">{providerEmail}</span>
      </div>
    </button>
  );
};
