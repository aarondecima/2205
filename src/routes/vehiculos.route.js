const express = require('express')
const vehiculosController = require('../controllers/vehiculos.controller')

const router = express.Router()

router.get('/',vehiculosController.getAllVehiculos)
router.get('/:patente',vehiculosController.getVehiculoByPatente)
router.put('/:patente',vehiculosController.putVehiculo)
router.post('/',vehiculosController.postVehiculo)

module.exports={router}