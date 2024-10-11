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
    respondMessageRequest: async (requestId:number,clientId:number,response:string) => {
        const apiresponse = await api.post(`provider/respond-message-request`,{requestId,clientId,response})
        return await apiresponse.json()
    }
}

export default providerService