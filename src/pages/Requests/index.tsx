import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MessageRequest } from "../../types/MessageRequest";
import providerService from "../../services/providerService";
import customStyles from "./index.module.css";
import Client from "@/types/Client";
import clientService from "@/services/clientService";
import { DateTime } from "luxon";

const Requests = () => {
  const [messageRequests, setMessageRequests] = useState<MessageRequest[]>([]);
  const [currentRequest, setCurrentRequest] = useState<MessageRequest | null>(
    null
  );
  const [providerResponse, setProviderResponse] = useState("");
  const [clients, setClients] = useState<Client[]>([]); // Estado para armazenar os clientes

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setProviderResponse(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentRequest) {
      providerService.respondMessageRequest(
        currentRequest?.id as number,
        currentRequest.clientId,
        providerResponse
      );
      setProviderResponse(""); // Limpa o campo de resposta após o envio
      setCurrentRequest(null);
      window.location.reload()
    }
  };

  useEffect(() => {
    (async () => {
      const response = await providerService.getMessageRequests();
      setMessageRequests(response.requests);
    })();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      if (messageRequests.length > 0) {
        // Extraia os IDs dos clientes das solicitações de mensagem
        const clientIds = messageRequests.map((request) => request.clientId);

        // Recupera os clientes baseando-se nos IDs únicos
        const uniqueClientIds = Array.from(new Set(clientIds)); // Remove duplicatas
        const clientsData = await Promise.all(
          uniqueClientIds.map((clientId) => clientService.getById(clientId))
        );

        setClients(clientsData);
      }
    };

    fetchClients();
  }, [messageRequests]);


  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="border rounded-lg max-w-5xl w-full h-full text-sm flex max-h-[500px]">
        {messageRequests.length > 0 ? (
          <>
            <div
              className={`flex flex-col gap-3 p-6 border-r max-h-full overflow-y-scroll overflow-x-hidden ${customStyles.customScroll} min-w-[300px]`}
            >
              <div className="flex gap-2 items-center text-2xl font-medium">
                Chats{" "}
                <span className="text-zinc-300">
                  ({messageRequests.length})
                </span>
              </div>
              {messageRequests.map((messageRequest) => (
                <div
                  key={messageRequest.id} // Adiciona uma chave única para cada item
                  className={`flex flex-col text-m font-medium min-h-[64px] w-full justify-center hover:bg-accent rounded-xl p-3 ${
                    currentRequest?.id === messageRequest.id && "bg-accent"
                  }`}
                  onClick={() => setCurrentRequest(messageRequest)}
                >
                  <p>
                    {
                      clients.find(
                        (client) => client.id === messageRequest.clientId
                      )?.name
                    }
                  </p>
                  <p className="text-zinc-300 text-sm">
                    {DateTime.fromISO(messageRequest.created_at)
                      .setZone("America/Sao_Paulo")
                      .toFormat("dd/MM HH:mm")}
                  </p>
                </div>
              ))}
            </div>
            <form
              className={`w-full h-full flex flex-col ${currentRequest?'justify-between':'justify-end'} p-6`}
              onSubmit={handleSubmit}
            >
              {currentRequest && (
                <p className="p-4 bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg break-words max-w-[400px] whitespace-pre-wrap">
                  {currentRequest?.message}
                </p>
              )}
              <div className="flex items-center">
                <textarea
                  name="providerResponse"
                  value={providerResponse} // Para controle do valor do input
                  onChange={handleInputChange}
                  placeholder={
                    currentRequest
                      ? `Mande uma mensagem para ${
                          clients.find(
                            (client) => client.id === currentRequest?.clientId
                          )?.name
                        }`
                      : ""
                  }
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4"
                />
                <button type="submit" className="ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs ml-auto">Enviar</button>
              </div>
            </form>
          </>
        ) : (
          <h1>Não foram encontradas mensagens</h1>
        )}
      </div>
    </div>
  );
};

export default Requests;
