const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const reservasRouter = require('./routes/reservas.route')
const vehiculosRouter = require('./routes/vehiculos.route')

app.use(express.json())
app.use('/reservas',reservasRouter.router)
app.use('/vehiculos',vehiculosRouter.router)

app.listen(PORT, ()=>{console.log(`App escuchado en el puerto ${PORT}`)})