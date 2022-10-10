const axios = require('axios'); // Import da biblioteca responsável por fazer requests http
require('dotenv/config')
const env = process.env

// Controlador de acesso a postionstack(Geocoding api)

class GeoAPI {
    constructor() { 
        this.axiosInstance = axios.create({ // Cria instância de uma URL base para os requests
            baseURL: 'http://api.positionstack.com/v1',
            timeout: 50000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
    }

    async request_api(path) { // Método que realiza requests a api
        return new Promise((resolve, reject) => {
            console.log("Fazendo request a "+path)
      
            this.axiosBase
              .get(path+"&access_key="+env.API_KEY+"&limit=10&output=json") // API_KEY + parâmetros opcionais
              .then((apiresponse) => {
                // console.log(apiresponse.data)
                console.log("Dados coletados") || resolve(apiresponse.data)
              })
              .catch((e) => {
                console.log("Não foi possível recuperar os dados")
                console.error(e.response.data, e.response.status)
                reject(e.response.data + " - " + e.response.status)
              })
          })
    }
    
    async forward_coding(query) { // Método utilizado para realizar forward geocoding (texto -> coordenada)
        return await this.request_api("/forward?query="+query)
    }

    async reverse_coding(query) { // Método utilizado para realizar reverse geocoding (coordenada -> texto)
        return await this.request_api("/reverse?query="+query) 
    }
}

if (!global.GeoAPI) { // Cria nova instância do controlador caso não exista uma
    console.log("GeoAPI instanciado")
    global.GeoAPI = new GeoAPI();
}

module.exports = global.GeoAPI // Exporta controlador