import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import customStyles from "./index.module.css";
import Service from "../../types/Service";
import servicesOfferedService from "../../services/servicesOfferedService";

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceWithfaq = { ...service, faq }; // Inclui os faq ao serviço
    servicesOfferedService.create(serviceWithfaq as Service);
  };

  return (
    <div className={customStyles.addServiceWrapper}>
      <form
        className={customStyles.addServiceContainer}
        onSubmit={handleSubmit}
      >
        <div className={customStyles.fixedFields}>
          <TextInput
            handleChange={handleInputChange}
            name="name"
            placeholder="Digite o nome do serviço"
            type="text"
          />
          <TextInput
            handleChange={handleInputChange}
            name="description"
            placeholder="Digite uma breve descrição do serviço"
            type="text"
          />
          <TextInput
            handleChange={handleInputChange}
            name="price"
            placeholder="Digite o preço do serviço"
            type="text"
          />
          <Button type="submit">Cadastrar Serviço</Button>
        </div>
        <div className={customStyles.variableFields}>
        <div>
            {faq.map((_, index) => (
            <div key={index} className={customStyles.faqWrapper}>
            <span>Pergunta {index + 1}</span>
              <TextInput
                handleChange={(e) => handleFaqChange(index, e)}
                name="question"
                placeholder="Digite a pergunta"
                type="text"
              />
              <span>Resposta {index + 1}</span>
              <TextInput
                handleChange={(e) => handleFaqChange(index, e)}
                name="response"
                placeholder="Digite a resposta"
                type="text"
              />
            </div>
          ))}
            </div>
          <Button type="button" onClick={addFaq}>
            Adicionar FAQ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
