import { useContext, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import providerService from "@/services/providerService";
import Service from "@/types/Service";
import servicesOfferedService from "@/services/servicesOfferedService";
import Bot from "@/types/Bot";
import botService from "@/services/botService";
import { toast } from "sonner";

const Profile = () => {
  const useAuth = useContext(UserContext);
  const { provider } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "services">("profile");
  const [user, setUser] = useState({ ...provider });
  const [services, setServices] = useState<Service[]>([]);
  const [bot, setBot] = useState<Bot>();

  useEffect(() => {
    if (provider?.id) {
      setUser({ ...provider });
      (async () => {
        const response = await servicesOfferedService.getAllByProviderId(
          provider.id as number
        );
        setServices(response);
      })();
      (async () => {
        const response = await botService.getByProviderId(
          provider.id as number
        );
        setBot(response);
      })();
    }
  }, [provider]);

  const handleProviderInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProviderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await providerService.update({ ...user });
    toast(response.message);
  };

  const handleServiceInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setServices(updatedServices);
  };

  const handleServiceSubmit = async (
    e: FormEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault();
    const serviceToUpdate = services[index];

    try {
      const response = await servicesOfferedService.update({
        id: serviceToUpdate.id,
        description: serviceToUpdate.description,
        name: serviceToUpdate.name,
        price: serviceToUpdate.price,
      });
      toast(response.message);
    } catch (error) {
      toast(`erro: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex gap-4">
          {" "}
          <Card className="mb-6">
            <CardHeader className="flex">
              <CardTitle>Nome do bot</CardTitle>
              <CardDescription>{bot?.name}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="mb-6">
            <CardHeader className="flex">
              <CardTitle>Link para conversar com o bot</CardTitle>
              <CardDescription>
                <a href={bot?.link} target="_blank">
                  {bot?.link}
                </a>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex mb-4">
          <Button
            onClick={() => setActiveTab("profile")}
            className={`mr-2 ${
              activeTab === "profile" ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            Editar Perfil
          </Button>
          <Button
            onClick={() => setActiveTab("services")}
            className={`${
              activeTab === "services" ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            Editar Serviços
          </Button>
        </div>

        {activeTab === "profile" && (
          <form
            onSubmit={handleProviderSubmit}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6">Dados Cadastrais</h2>
            <Input
              placeholder="Nome"
              type="text"
              name="name"
              value={user.name}
              onChange={handleProviderInputChange}
              className="mb-4"
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleProviderInputChange}
              className="mb-4"
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              name="password"
              onChange={handleProviderInputChange}
              className="mb-4"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Salvar
            </Button>
          </form>
        )}

        <div className="flex flex-wrap justify-start gap-4">
          {activeTab === "services" &&
            services.map((service, index) => (
              <form
                key={service.id}
                onSubmit={(e) => handleServiceSubmit(e, index)}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Serviço {index + 1}
                </h2>
                <Input
                  placeholder="Nome do Serviço"
                  type="text"
                  name="name"
                  value={service.name}
                  onChange={(e) => handleServiceInputChange(e, index)}
                  className="mb-4"
                />
                <Input
                  placeholder="Descrição do Serviço"
                  type="text"
                  name="description"
                  value={service.description}
                  onChange={(e) => handleServiceInputChange(e, index)}
                  className="mb-4"
                />
                <Input
                  placeholder="Preço do serviço"
                  type="text"
                  name="price"
                  value={service.price}
                  onChange={(e) => handleServiceInputChange(e, index)}
                  className="mb-4"
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                  Salvar
                </Button>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
