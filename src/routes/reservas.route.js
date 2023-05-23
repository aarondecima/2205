const express = require('express')
const reservasController = require('../controllers/reservas.controller')

const router = express.Router()

router.get('/',reservasController.getAllReservas)
router.get('/:id',reservasController.getReservaById)
router.delete('/:id',reservasController.deleteReservaById)
router.post('/',reservasController.postReserva)

module.exports={router}