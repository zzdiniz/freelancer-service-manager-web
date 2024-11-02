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
  const [clients, setClients] = useState<Client[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProviderResponse(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentRequest) {
      await providerService.respondMessageRequest(
        currentRequest?.id as number,
        currentRequest.clientId,
        providerResponse
      );
      setProviderResponse("");
      setCurrentRequest(null);
      const response = await providerService.getMessageRequests();
      setMessageRequests(response.requests);
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
        const clientIds = messageRequests.map((request) => request.clientId);
        const uniqueClientIds = Array.from(new Set(clientIds));
        const clientsData = await Promise.all(
          uniqueClientIds.map((clientId) => clientService.getById(clientId))
        );
        setClients(clientsData);
      }
    };

    fetchClients();
  }, [messageRequests]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="border border-gray-700 rounded-lg max-w-5xl w-full h-full text-sm flex max-h-[500px] shadow-lg bg-gray-800">
        {messageRequests.length > 0 ? (
          <>
            <div
              className={`flex flex-col gap-3 p-6 border-r border-gray-700 max-h-full overflow-y-scroll overflow-x-hidden ${customStyles.customScroll} min-w-[300px]`}
            >
              <div className="flex gap-2 items-center text-2xl font-medium text-white">
                Chats{" "}
                <span className="text-gray-400">
                  ({messageRequests.length})
                </span>
              </div>
              {messageRequests.map((messageRequest) => (
                <div
                  key={messageRequest.id}
                  className={`flex flex-col text-m font-medium min-h-[64px] w-full justify-center hover:bg-gray-700 rounded-lg p-3 cursor-pointer ${
                    currentRequest?.id === messageRequest.id && "bg-gray-700"
                  }`}
                  onClick={() => setCurrentRequest(messageRequest)}
                >
                  <p className="text-white">
                    {
                      clients.find(
                        (client) => client.id === messageRequest.clientId
                      )?.name
                    }
                  </p>
                  <p className="text-gray-400 text-sm">
                    {DateTime.fromISO(messageRequest.created_at)
                      .setZone("America/Sao_Paulo")
                      .toFormat("dd/MM HH:mm")}
                  </p>
                </div>
              ))}
            </div>
            <form
              className={`w-full h-full flex flex-col ${currentRequest ? 'justify-between' : 'justify-end'} p-6`}
              onSubmit={handleSubmit}
            >
              {currentRequest && (
                <p className="p-4 bg-gray-700 text-gray-200 rounded-r-lg rounded-tl-lg break-words max-w-[400px] whitespace-pre-wrap">
                  {currentRequest?.message}
                </p>
              )}
              <div className="flex items-center">
                <textarea
                  name="providerResponse"
                  value={providerResponse}
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
                  className="flex min-h-[60px] w-full rounded-lg border border-gray-600 bg-gray-700 text-sm text-gray-100 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 p-4"
                />
                <button
                  type="submit"
                  className="ml-4 min-w-[100px] min-h-[50px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-2 rounded-lg transition-all duration-300 ease-in-out"
                >
                  Enviar
                </button>
              </div>
            </form>
          </>
        ) : (
          <h1 className="text-gray-200">Não foram encontradas mensagens</h1>
        )}
      </div>
    </div>
  );
};

export default Requests;
