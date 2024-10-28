import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Service from "../../types/Service";
import servicesOfferedService from "../../services/servicesOfferedService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FAQ {
  question: string;
  response: string;
}

const AddServices = () => {
  const [service, setService] = useState<Service | {}>({});
  const [faq, setFaq] = useState<FAQ[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  const handleFaqChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newfaq = [...faq];
    newfaq[index] = { ...newfaq[index], [name]: value };
    setFaq(newfaq);
  };

  const addFaq = () => {
    setFaq([...faq, { question: "", response: "" }]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceWithfaq = { ...service, faq };
    const response = await servicesOfferedService.create(serviceWithfaq as Service);
    toast(response.message);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <form
        className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Adicionar Serviço</h1>

        {/* Campos Fixos */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-400">Nome do Serviço</label>
          <Input
            onChange={handleInputChange}
            name="name"
            placeholder="Digite o nome do serviço"
            type="text"
            className="px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-400">Descrição</label>
          <Input
            onChange={handleInputChange}
            name="description"
            placeholder="Digite uma breve descrição do serviço"
            type="text"
            className="px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-400">Preço</label>
          <Input
            onChange={handleInputChange}
            name="price"
            placeholder="Digite o preço do serviço"
            type="text"
            className="px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out mb-4">
          Cadastrar Serviço
        </Button>
        <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out" onClick={()=>navigate("/register/bot")}>
          Ir para próxima etapa
        </Button>

        {/* Campos Variáveis para FAQ */}
        <div className="mt-6">
          {faq.map((_, index) => (
            <div key={index} className="mb-4">
              <span className="block mb-2 font-medium text-gray-200">Pergunta {index + 1}</span>
              <Input
                onChange={(e) => handleFaqChange(index, e)}
                name="question"
                placeholder="Digite a pergunta"
                type="text"
                className="px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
              <span className="block mb-2 font-medium text-gray-200 mt-4">Resposta {index + 1}</span>
              <Input
                onChange={(e) => handleFaqChange(index, e)}
                name="response"
                placeholder="Digite a resposta"
                type="text"
                className="px-4 py-2 rounded-lg text-gray-100 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>
          ))}
          <Button type="button" onClick={addFaq} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out">
            Adicionar FAQ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
