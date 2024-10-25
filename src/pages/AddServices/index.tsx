import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button"; // Importando o componente Button da shadcn/ui
import { Input } from "@/components/ui/input"; // Importando o componente Input da shadcn/ui
import Service from "../../types/Service";
import servicesOfferedService from "../../services/servicesOfferedService";
import { toast } from "sonner";

interface FAQ {
  question: string;
  response: string;
}

const AddServices = () => {
  const [service, setService] = useState<Service | {}>({});
  const [faq, setFaq] = useState<FAQ[]>([]);

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
    const serviceWithfaq = { ...service, faq }; // Inclui os faq ao serviço
    const response = await servicesOfferedService.create(serviceWithfaq as Service);
    toast(response.message)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Adicionar Serviço</h1>
        
        {/* Campos Fixos */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Nome do Serviço</label>
          <Input
            onChange={handleInputChange}
            name="name"
            placeholder="Digite o nome do serviço"
            type="text"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Descrição</label>
          <Input
            onChange={handleInputChange}
            name="description"
            placeholder="Digite uma breve descrição do serviço"
            type="text"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Preço</label>
          <Input
            onChange={handleInputChange}
            name="price"
            placeholder="Digite o preço do serviço"
            type="text"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
          Cadastrar Serviço
        </Button>

        {/* Campos Variáveis para FAQ */}
        <div className="mt-6">
          {faq.map((_, index) => (
            <div key={index} className="mb-4">
              <span className="block mb-2 font-medium text-gray-700">Pergunta {index + 1}</span>
              <Input
                onChange={(e) => handleFaqChange(index, e)}
                name="question"
                placeholder="Digite a pergunta"
                type="text"
              />
              <span className="block mb-2 font-medium text-gray-700 mt-4">Resposta {index + 1}</span>
              <Input
                onChange={(e) => handleFaqChange(index, e)}
                name="response"
                placeholder="Digite a resposta"
                type="text"
              />
            </div>
          ))}
          <Button type="button" onClick={addFaq} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Adicionar FAQ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
