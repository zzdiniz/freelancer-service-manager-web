
const api = {

    get: async (url: string) => {
      return apiRequest(url, 'GET');
    },

    post: async (url: string, body: any) => {
      return apiRequest(url, 'POST', body);
    },

    put: async (url: string, body: any) => {
      return apiRequest(url, 'PUT', body);
    },

    patch: async (url: string, body: any) => {
      return apiRequest(url, 'PATCH', body);
    },

    delete: async (url: string) => {
      return apiRequest(url, 'DELETE');
    }
  };
  
  const apiRequest = async (url: string, method: string, body?: any) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API?.concat(url)}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      return response
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };
  
  export default api;
  