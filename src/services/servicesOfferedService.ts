import Service from "../types/Service";
import api from "./api";

const servicesOfferedService = {
    create: async (service:Service) =>{
        const response = await api.post(`service/add-service`,service)
        return await response.json()
    }
}

export default servicesOfferedService