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

const Profile = () => {
  const useAuth = useContext(UserContext);
  const { provider } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "services">("profile");
  const [user, setUser] = useState({ ...provider });
  useEffect(() => {
    if (provider) {
      setUser({ ...provider });
    }
  }, [provider]);
  const updateUser = (data: any) => {};
  const updateService = (data: any) => {};

  const handleProviderInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProviderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await providerService.update({...user})
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{provider?.name}</CardTitle>
            <CardDescription>{provider?.email}</CardDescription>
          </CardHeader>
        </Card>

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

        <form
          onSubmit={handleProviderSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {activeTab === "profile" && (
            <>
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
            </>
          )}
          {activeTab === "services" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Serviços</h2>
              <Input
                placeholder="Nome do Serviço"
                type="text"
                name="serviceName"
                value={"teste"}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                placeholder="Descrição do Serviço"
                type="text"
                name="serviceDescription"
                value={"teses"}
                onChange={handleInputChange}
                className="mb-4"
              />
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
