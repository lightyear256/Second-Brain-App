import axios from "axios";
// import { shareHandler } from "../utils/sharer";
import { useShareHandler } from "../hooks/useShareHandler";

type DesignerToggleProps = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

export function DesignerToggle({ enabled, setEnabled }: DesignerToggleProps) {
  const handleShare=useShareHandler();
  const handleToggle = async () => {
    const newValue = !enabled;
    setEnabled(newValue); // update local state immediately for UI
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/setter`,
        { shared: newValue },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("share", String(newValue));
    } catch (error) {
      console.error("Failed to update sharing state", error);
    }
    handleShare();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-14 h-8 rounded-full transition-colors duration-500 ease-in-out
        ${enabled ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-gray-300'}`}
    >
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transform transition-all duration-500 ease-in-out
          ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  );
}
