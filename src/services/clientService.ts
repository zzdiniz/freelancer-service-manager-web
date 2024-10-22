import api from "./api"

const clientService = {
    getById: async (clientId: number) =>{
        const response = await api.get(`client/${clientId}`)
        return await response.json()
    }
}
export default clientService