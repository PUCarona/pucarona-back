const express = require("express") // Import do express
const port = 3000 // Port na qual o servidor rodará
const app = express() // Inicialização do express
require("dotenv/config")
const env = process.env // Import das variáveis do ambiente(pegar infos do arquivo .env)
const dbcontroller = require("./dbcontroller") // Import do controller do banco de dados
const geoapi = require("./geoapi")
const bodyParser = require("body-parser")

//MIDDLEWARE
app.use(async (req, res, next) => { // Middlware responsável por verificar senha e traduzir body para JSON
    if (req.query.pass == env.SECRET_KEY) {
      next();
    } else {
      res.send({ message: "Wrong password!" });
    }
  }, bodyParser.json());

// ROTAS
const UserRouter = require("./routes/user")
const TripRouter = require("./routes/trip")
const ParticipantRouter = require("./routes/participant")
//   USER:
app.use("/user", UserRouter) // Define o UserRouter como responsável das rotas '/user'
//   TRIP:
app.use("/trip", TripRouter) // Define o TripRouter como responsável das rotas '/trip'
//   PARTICIPANT:
app.use("/participant", ParticipantRouter) // Define o ParticipantRouter como responsável das rotas '/participant'

// START
app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log(`Listening at port ${port}`)
})