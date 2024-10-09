import api from "./api";

const providerService = {
    getByToken: async () =>{
        const response = await api.get(`provider/validate`)
        return await response.json()
    }
}

export default providerService