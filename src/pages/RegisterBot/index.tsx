import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import botService from "../../services/botService";
import Loader from "../../components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterBot = () => {
  const [name, setName] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const useAuth = useContext(UserContext);
  const navigate = useNavigate();
  const { provider } = useAuth();

  useEffect(()=>{
    if(provider?.id){
      verifyBot(provider.id)
    }
  },[provider])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await botService.create(name);
      setIsLoading(false);
      setQrcode(response.image);
    } catch (error) {
      setIsLoading(false)
      toast("Você precisa definir um nome para o bot")
    }
  };

  const verifyBot = async (providerId: number) => {
    try {
      const response = await botService.getByProviderId(providerId);
      toast("Bem vindo!");
      if(response){
        navigate("/")
      }
    } catch (error) {
      toast("Parece que houve um problema ao cadastrar seu bot.", {
        description:
          "Por favor, tente inserir outro nome. (O nome do bot não deve possuir acentos ou caracteres especiais)",
      });
      setQrcode("");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md flex items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Cadastrar bot
          </h1>
          <p className="max-w-[300px] text-center text-sm mb-2 text-gray-400">
            Defina um nome ao bot que seus clientes irão interagir para agendar
            serviços, tirar dúvidas e solicitar mensagens
          </p>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Insira o nome do seu bot"
              type="text"
              onChange={handleInputChange}
              className="mb-4 min-h-[45px]"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded min-h-[45px]"
            >
              Enviar
            </Button>
          </form>
          {(qrcode) && (
            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-6 min-h-[45px]"
              onClick={() => {
                verifyBot(provider?.id as number);
              }}
            >
              Ir para página inicial
            </Button>
          )}
        </div>
        <div className="ml-6 pl-4 border-l border-gray-200 flex flex-col justify-center items-center max-w-[330px] min-w-[300px] w-full">
          {isLoading ? (
            <Loader width={50} />
          ) : qrcode ? (
            <img src={qrcode} alt="qrcode" className="mt-4" />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                Antes de inserir um nome para o bot siga os passos a seguir:
              </h3>
              <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-4">
                <li>Abra seu aplicativo do telegram</li>
                <li>Navegue até "Configurações" → "Dispositivos"</li>
                <li>Clique no botão "Conectar Desktop"</li>
                <li>Insira um nome para o seu bot e clique em "Enviar"</li>
                <li>Aponte seu celular para o QR code que irá aparecer</li>
                <li>Após escanear, clique em "Ir para página inicial"</li>
              </ol>
              <p className="text-sm text-gray-400 text-center">
                Pronto! Agora você possui um bot do telegram
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterBot;
