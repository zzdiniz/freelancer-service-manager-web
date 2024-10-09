import api from "./api";

const appointmentService = {
    getAll: async () =>{
        const response = await api.get(`appointment/get-all-by-provider`)
        return await response.json()
    }
}

export default appointmentService