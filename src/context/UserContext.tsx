import { ReactNode, createContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext(useAuth);

const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={useAuth}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
