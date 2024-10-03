import Provider from "../types/Provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const registerUser = async (provider: Provider | {}) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    };
    try {
      const response = await fetch(`${baseURL}provider/create`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        authUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authUser = async (data: { message: string; token: string }) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const login = async (user: Provider | {}) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    try {
      const response = await fetch(`${baseURL}provider/login`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        authUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { registerUser, isAuthenticated, logout, login };
};

export default useAuth;
