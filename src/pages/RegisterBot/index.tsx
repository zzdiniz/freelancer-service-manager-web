import customStyles from "./index.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import botService from "../../services/botService";
import Loader from "../../components/ui/Loader";
import { Button } from "@/components/ui/button"; // Importando o componente Button da shadcn/ui
import { Input } from "@/components/ui/input";

const RegisterBot = () => {
  const [name, setName] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await botService.create(name);
    setIsLoading(false);
    setQrcode(response.image);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md flex items-center">
        <form className={customStyles.formContainer} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Insira o nome do seu bot"
            type="text"
            onChange={handleInputChange}
            className="mb-4"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Enviar
          </Button>
        </form>
        <div className={customStyles.imageWrapper}>
          {isLoading ? (
            <Loader width={50} />
          ) : (
            <img src={qrcode} alt="qrcode" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterBot;
