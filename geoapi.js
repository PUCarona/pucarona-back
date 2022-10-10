const axios = require('axios');
require('dotenv/config')
const env = process.env

class GeoAPI {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://api.positionstack.com/v1',
            timeout: 50000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
    }

    async request_api(path) {
        return new Promise((resolve, reject) => {
            console.log("Fazendo request a "+path)
      
            this.axiosBase
              .get(path+"&access_key="+env.API_KEY)
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
    
    async forward_coding(query) {
        return await this.request_api("/forward?query="+query)
    }

    async reverse_coding(query) {
        return await this.request_api("/reverse?query="+query)
    }
}

if (!global.GeoAPI) {
    console.log("GeoAPI instanciado")
    global.GeoAPI = new GeoAPI();
}

module.exports = global.GeoAPI