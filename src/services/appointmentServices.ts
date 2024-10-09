import Appointment from "../types/Appointment";
import api from "./api";

const appointmentService = {
    getAll: async () =>{
        const response = await api.get(`appointment/get-all-by-provider`)
        return await response.json()
    },
    create: async (appointment:Appointment) =>{
        const response = await api.post(`appointment/add`,appointment)
        return await response.json()
    },
    updateStatus: async(id:number,status:string) =>{
        const response = await api.patch(`appointment/update-status`,{id,status})
        return await response.json()
    }
}

export default appointmentService