import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const useAuth = useContext(UserContext);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
};

export default Calendar;
