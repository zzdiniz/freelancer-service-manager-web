import Service from "../types/Service";
import api from "./api";

const servicesOfferedService = {
    create: async (service:Service) =>{
        const response = await api.post(`service/add-service`,service)
        return await response.json()
    },
    getById: async (serviceId: number) =>{
        const response = await api.get(`service/${serviceId}`)
        return await response.json()
    },
    getAllByProviderId: async (providerId:number) =>{
        const response = await api.get(`service/get-by-provider/${providerId}`)
        return await response.json()
    },
    update: async ({id,name,description,price}:Partial<Service>)=>{
        const response = await api.patch(`service/update?id=${id}`,{name,description,price})
        return await response.json()
    }
}

export default servicesOfferedService