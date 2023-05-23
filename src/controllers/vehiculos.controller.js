const vehiculos = require('../../data/vehiculos.json')

const getAllVehiculos = (req,res)=>{
    res.status(200).json(vehiculos)
}

const getVehiculoByPatente = (req,res)=>{
    const patente = req.params.patente
    const resultado = vehiculos.find(vehiculo=>vehiculo.patente==patente)
    if(resultado){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({mensaje: `El vehiculo con la patente ${patente} no fue encontrada`})
    }
}

const putVehiculo = (req,res)=>{
    const patente = req.params.patente
    const data = req.body
    const indice = vehiculos.findIndex(vehiculo=>vehiculo.patente==patente)
    if(indice>=0){
        vehiculos[indice].habilitado=data.habilitado
        vehiculos[indice].capacidad=data.capacidad
        vehiculos[indice].autonomiaKms=data.autonomiaKms
        res.status(201).json({"vehiculo": vehiculos[indice]})
    } else {
        res.status(404).json({
            resultado: "La operación de modificación no pudo ser realizada",
            mensaje: `El vehículo con la patente ${patente} no fue encontrado`
        })
    }
}

const postVehiculo = (req,res)=>{
    const data = req.body
    const existe = vehiculos.find(vehiculo=>vehiculo.patente==data.patente)
    const todoOk = true
    if(!existe){
        if(data.habilitado){
            data.habilitado=false
        }
        if(data.capacidad<1 || data.capacidad>10){
            res.status(400).json({
                mensaje: "No se puede registrar el vehiculo debido a que la capacidad debe ser entre 1 y 10"
            })
            todoOk=false
        }
        if(data.autonomiaKms<=0){
            res.status(400).json({
                mensaje: "No se puede registrar el vehículo debido a que la autonomía de kilometros debe ser mayor a 0"
            })
            todoOk=false        
        }
        if(todoOk){const vehiculo={
                patente: data.patente,
                marca: data.marca,
                modelo: data.modelo,
                habilitado: data.habilitado,
                capacidad: data.capacidad,
                autonomiaKms: data.autonomiaKms
        }
        vehiculos.push(vehiculo)
        res.status(201).json(vehiculo)
    }}else {
        res.status(400).json({
            mensaje: `El vehículo con patente ${data.patente} ya existe en la base de datos`
        })
    }
}

module.exports = {
    getAllVehiculos, getVehiculoByPatente, putVehiculo, postVehiculo
}