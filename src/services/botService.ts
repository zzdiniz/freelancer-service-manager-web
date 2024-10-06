import api from "./api";

const botService = {
    create: async (name:string) =>{
        const response = await api.post(`bot/create`,{name})
        return await response.json()
    }
}

export default botService