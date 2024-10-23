import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "@/components/ui/button"; // Importando o componente Button da shadcn/ui
import { Input } from "@/components/ui/input"; // Importando o componente TextInput da shadcn/ui
import { Link } from "react-router-dom"; // Utilizando o Link do react-router-dom

const Login = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const useAuth = useContext(UserContext);
  const { login } = useAuth();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(user);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <Input
          placeholder="Digite seu email"
          type="email"
          name="email"
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          name="password"
          onChange={handleInputChange}
          className="mb-6"
        />
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
          Login
        </Button>
        <p className="mt-4 text-center">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
