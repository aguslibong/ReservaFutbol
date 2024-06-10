import express from "express";
import sequelize from "../../../db/db.js"
import Reserva from "../../../src/model/reserva-model.js"

export const Reservas = async (req, res) => {
    try{
        if (req.params.id){
            const id = req.params.id;
            const reservaId = await Reserva.findOne({ 
                where: { 
                    idReserva: id
                    }});
            res.json(reservaId);
    }   else {
            const respuesta = await Reserva.findAll();
            res.json(respuesta);
            }

        }
    catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' })
    }
}

export const ReservasPost = async (req, res) => {
    const nuevaReserva = req.body;
    console.log(req.body)
    try {
        // Crear la reserva utilizando los datos del cuerpo de la solicitud
        const reservaCreada = await Reserva.create(nuevaReserva);
        // Devolver el código de estado 201 para indicar que la reserva se ha creado correctamente
        res.status(201).json(reservaCreada);
    } catch (error) {
        // Devolver el código de estado 400 junto con el mensaje de error específico
        res.status(400).json({ error: error.message });
    }
}