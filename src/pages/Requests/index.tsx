import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MessageRequest } from "../../types/MessageRequest";
import providerService from "../../services/providerService";
import customStyles from "./index.module.css";

const Requests = () => {
  const [messageRequests, setMessageRequests] = useState<MessageRequest[]>();
  const [currentRequest, setCurrentRequest] = useState<MessageRequest>();
  const [providerResponse, setProviderResponse] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProviderResponse(value);
  };
  const handleSubimit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    providerService.respondMessageRequest(
      currentRequest?.id as number,
      currentRequest?.clientId as number,
      providerResponse
    );
  };

  useEffect(() => {
    (async () => {
      const response = await providerService.getMessageRequests();
      setMessageRequests(response.requests);
    })();
  }, []);
  console.log("🚀 ~ response :", messageRequests);
  return (
    <div className={customStyles.messageRequestsWrapper}>
      <div className={customStyles.messageRequestsContainer}>
        {messageRequests ? (
          <>
            <div className={customStyles.resquestList}>
              {messageRequests.map((messageRequest) => {
                return (
                  <div
                    className={customStyles.request}
                    onClick={() => setCurrentRequest(messageRequest)}
                  >
                    {messageRequest.message}
                  </div>
                );
              })}
            </div>
            <form className={customStyles.chat} onSubmit={handleSubimit}>
              <p className={customStyles.messageRequest}>
                {currentRequest?.message}
              </p>
              <input
                type="text"
                name="providerResponse"
                onChange={handleInputChange}
              />
              <button type="submit">enviar</button>
            </form>
          </>
        ) : (
          <h1>Não foram encontradas mensagems</h1>
        )}
      </div>
    </div>
  );
};
export default Requests;
