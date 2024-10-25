import Provider from "../types/Provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import providerService from "../services/providerService";
import { toast } from "sonner"

const baseURL = "http://localhost:3000/";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [provider,setProvider] = useState<Provider>()
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      (async()=>{
        const response = await providerService.getByToken()
        setProvider(response)
      })()
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
      if (response.status === 200) {
        authUser(data);
        navigate("/register/service");
      }
      toast(data.message)
    } catch (error) {
      toast(`${error}`)
      console.error(error);
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
    toast("Usuário deslogado com sucesso")
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
      if (response.status === 200) {
        authUser(data);
        return navigate("/");
      }
      toast(data.message)
    } catch (error) {
      console.error(error);
    }
  };

  return { registerUser, isAuthenticated, logout, login , provider};
};

export default useAuth;
