const express = require("express") // Import do express
const port = 3000 // Port na qual o servidor rodará
const app = express() // Inicialização do express
require("dotenv/config")
const env = process.env // Import das variáveis do ambiente(pegar infos do arquivo .env)
const dbcontroller = require("./dbcontroller") // Import do controller do banco de dados

// ENDPOINTS


// START
app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log(`Listening at port ${port}`)
})