require("dotenv/config")
const env = process.env
const mongoose = require("mongoose")
require("./models/user")
require("./models/location")
require("./models/participant")
require("./models/trip")

// Controller responsável por acessar o mongodb

class dbController {
    async connectDatabase() {
        await mongoose.connect(env.DB_CONNECTION_STRING, { // Método responsável por se conectar ao mongodb
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to the database")
    }

    async getModel(model) { // Método responsável por retornar model
        if (mongoose.connection.readyState != 1) await this.connectDatabase()
        return mongoose.model(model)
      }
}

if (!global.dbController) {
    console.log("dbController instanciado")
    global.dbController = new dbController()
  }
  
  module.exports = global.dbController