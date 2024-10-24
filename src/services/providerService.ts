import Provider from "@/types/Provider";
import api from "./api";

const providerService = {
    getByToken: async () =>{
        const response = await api.get(`provider/validate`)
        return await response.json()
    },
    getMessageRequests: async () =>{
        const response = await api.get(`provider/get-message-requests`)
        return await response.json()
    },
    getMetrics: async () =>{
        const response = await api.get(`provider/get-metrics`)
        return await response.json()
    },
    respondMessageRequest: async (requestId:number,clientId:number,response:string) => {
        const apiresponse = await api.post(`provider/respond-message-request`,{requestId,clientId,response})
        return await apiresponse.json()
    },
    update: async ({name,email,password}:Partial<Provider>) =>{
        const response = await api.patch(`provider/update`,{name,email,password})
        return await response.json()
    }
}

export default providerService