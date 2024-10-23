import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button } from "@/components/ui/button"; // Importando o componente Button da shadcn/ui
import { Input } from "@/components/ui/input"; // Importando o componente Input da shadcn/ui
import { Link } from "react-router-dom"; // Utilizando o Link do react-router-dom
import { UserContext } from "../../context/UserContext";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const useAuth = useContext(UserContext);
  const { registerUser } = useAuth();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.password !== user.confirmedPassword) {
      // Adicione um tratamento de erro se as senhas não coincidirem
      return;
    }
    registerUser(user);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Registrar</h1>
        <Input
          placeholder="Digite seu nome"
          type="text"
          name="name"
          onChange={handleInputChange}
          className="mb-4"
        />
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
          className="mb-4"
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          name="confirmedPassword"
          onChange={handleInputChange}
          className="mb-6"
        />
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
          Cadastrar
        </Button>
        <p className="mt-4 text-center">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entre
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
