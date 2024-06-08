import express from "express";
import sequelize from "../../../db/db.js"
import Reserva from "../../../src/model/reserva-model.js"

export const Reservas = async (req, res) => {
    try{
        const respuesta = await Reserva.findAll();
        res.json(respuesta);
    }
    catch (error){
        console.log(error)
    }
}

export const ReservasId = async (req, res) => {
    try {
        const id = req.params.id;
        const reservaId = await Reserva.findOne({ 
            where: { 
                idReserva: id
            }});
        res.json(reservaId);
    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}


