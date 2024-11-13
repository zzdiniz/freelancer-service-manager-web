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

  useEffect(() => {
    if (provider?.id && qrcode) {
      verifyBot(provider.id);
    }
  }, [provider]);

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
      setIsLoading(false);
      toast("Você precisa definir um nome para o bot");
    }
  };

  const verifyBot = async (providerId: number) => {
    try {
      const response = await botService.getByProviderId(providerId);
      toast("Bem vindo!");
      if (response) {
        navigate("/");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg flex items-center border border-gray-700 w-full max-w-4xl">
        <div className="flex flex-col justify-center items-center w-full max-w-sm">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Cadastrar Bot
          </h1>
          <p className="max-w-xs text-center text-sm mb-4 text-gray-400">
            Defina um nome para o bot que seus clientes irão interagir para
            agendar serviços, tirar dúvidas e solicitar mensagens
          </p>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Insira o nome do seu bot"
              type="text"
              onChange={handleInputChange}
              className="mb-4 px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out"
            >
              Enviar
            </Button>
          </form>
          {qrcode && (
            <Button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 ease-in-out"
              onClick={() => {
                verifyBot(provider?.id as number);
              }}
            >
              Ir para página inicial
            </Button>
          )}
        </div>
        <div className="ml-8 pl-6 border-l border-gray-700 flex flex-col justify-center items-center w-full">
          {isLoading ? (
            <Loader width={50} />
          ) : qrcode ? (
            <img src={qrcode} alt="qrcode" className="mt-4 rounded-lg" />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
                Antes de inserir um nome para o bot, siga os passos abaixo:
              </h3>
              <ol className="list-decimal pl-5 text-gray-400 space-y-2 mb-4">
                <li>Abra seu aplicativo do Telegram</li>
                <li>Navegue até "Configurações" → "Dispositivos"</li>
                <li>Clique no botão "Conectar Desktop"</li>
                <li>Insira um nome para o seu bot e clique em "Enviar"</li>
                <li>Aponte seu celular para o QR code que irá aparecer</li>
                <li>Após escanear, clique em "Ir para página inicial"</li>
              </ol>
              <p className="text-sm text-gray-500 text-center">
                Pronto! Agora você possui um bot do Telegram.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterBot;
