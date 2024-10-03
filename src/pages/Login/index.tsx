import Button from "../../components/Button";
import LinkCustom from "../../components/LinkCustom";
import TextInput from "../../components/TextInput";
import customStyles from "./index.module.css";
import { UserContext } from "../../context/UserContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
const Login = () => {
  const [user, setUser] = useState({});
  const useAuth = useContext(UserContext);
  const { login } = useAuth();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubimit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(user);
  };

  return (
    <div className={customStyles.loginWrapper}>
      <form className={customStyles.loginContainer} onSubmit={handleSubimit}>
        <TextInput
          placeholder="Digite seu email"
          type="email"
          name="email"
          handleChange={handleInputChange}
        />
        <TextInput
          placeholder="Digite sua senha"
          type="password"
          name="password"
          handleChange={handleInputChange}
        />
        <Button>Login</Button>
        <LinkCustom to="/register">Não tem uma conta? Registre-se</LinkCustom>
      </form>
    </div>
  );
};
export default Login;
