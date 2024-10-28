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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <form
        className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Cadastre-se</h1>
        <Input
          placeholder="Seu nome"
          type="text"
          name="name"
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <Input
          placeholder="Seu email"
          type="email"
          name="email"
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <Input
          placeholder="Sua senha"
          type="password"
          name="password"
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          name="confirmedPassword"
          onChange={handleInputChange}
          className="mb-6 px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out">
          Cadastrar
        </Button>
        <p className="mt-6 text-center text-gray-400">
          Já possui conta?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-400 transition-all duration-300">
            Entre
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
