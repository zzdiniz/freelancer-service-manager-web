import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import RegisterBot from "./pages/RegisterBot";
import EditProfile from "./pages/EditProfile";
import Calendar from "./pages/Calendar";
import { UserProvider } from "./context/UserContext";
import AddServices from "./pages/AddServices";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/register/bot" element={<RegisterBot />} />
        <Route path="/register/service" element={<AddServices />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<Calendar />} />
      </Routes>
      </UserProvider>
    </Router>
  )
}
export default App