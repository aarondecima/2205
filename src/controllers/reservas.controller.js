const reservas = require('../../data/reservas.json')
const vehiculos = require('../../data/vehiculos.json')

const getAllReservas = (req,res)=>{
    res.status(200).json(reservas)
}

const getReservaById = (req,res)=>{
    const id = req.params.id
    const resultado = reservas.find(reserva=>reserva.id==id)
    if(resultado){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({mensaje: `La reserva con id ${id} no fue encontrada`})
    }
}

const deleteReservaById = (req,res)=>{
    const id = req.params.id
    const indice = reservas.findIndex(reserva=>reserva.id==id)
    if(indice==-1){
        res.status(404).json({
            resultado:"La operación de borrano no pudo ser realizada",
            mensaje: `La reserva con id ${id} no fue encontrada`
        })
    } else {
        const reserva = reservas[indice]
        const resultado = reservas.splice(indice,1)
        res.status(200).json({
            resultado:"La operación de borrado pudo realizarse con éxito",
            reserva: reserva})
    }
}

const postReserva = (req,res)=>{
    const data = req.body
    const idx = reservas.findIndex(reserva=>reserva.vehiculo.habilitado)
    const todoOk = true
    if(idx=>0){
        let maxId = 1 
        if(reservas.length>0){
            const idsReserva = reservas.map(r=>r.id)
            maxId = Math.max(...idsReserva) + 1 
        }
        if(data.cantPersonas<1 || data.cantPersonas>10){
            res.status(400).json({
                mensaje: "No se puede registrar la reserva debido a que la cantidad de personas debe ser entre 1 y 10"
            })
            todoOk=false
        }
        if(data.distancia>500){
            res.status(400).json({
                mensaje: "No se puede registrar la reserva debido a que la distancia no puede ser mayor a 500 kms"
            })
            todoOk=false
        }
        const vehiculoApto = vehiculos.find(v=>v.habilitado && v.capacidad >= data.cantPersonas && v.autonomiaKms >= data.distancia)
        if(!vehiculoApto){
            res.status(400).json({
                mensaje: "No se puede registrar la reserva debido a que no hay vehículo que cumpla los requisitos solicitados"
            })
            todoOk=false
        }
        if(todoOk){ 
            const reserva= {
            id: maxId,
            cliente: data.cliente,
            cantPersonas: data.cantPersonas,
            distancia: data.distancia,
            fecha: data.fecha,
            vehiculo: vehiculoApto
        }
        reservas.push(reserva)
        res.status(201).json(reserva)
    }} else {
        res.status(400).json({
            mensaje: `No es posible realizar la reserva.`
        })
    }
}

module.exports = {
    getAllReservas,getReservaById, deleteReservaById, postReserva
}