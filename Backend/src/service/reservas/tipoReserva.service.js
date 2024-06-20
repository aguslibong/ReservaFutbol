import express from "express";
import sequelize from "../../../db/db.js"
import TipoReserva from "../../../src/model/tipoReserva-model.js"

export const TipoReservasGet = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const tipoReservaId = await TipoReserva.findOne({
                where: {
                    idTipoReserva: id
                }
            });
            res.json(tipoReservaId);
        } else {
            const respuesta = await TipoReserva.findAll();
            res.json(respuesta);
        }

    }
    catch (error) {
        console.error('Error al buscar Tipo de Reservas:', error);
        res.status(500).json({ error: 'Error al buscar Tipo de Reservas' })
    }
}

export const TipoReservasPost = async (req, res) => {
    const nuevaTipoReserva = req.body;
    console.log(req.body)
    try {
        // Crear la reserva utilizando los datos del cuerpo de la solicitud
        const tipoReservaCreada = await TipoReserva.create(nuevaTipoReserva);
        // Devolver el código de estado 201 para indicar que la reserva se ha creado correctamente
        res.status(201).json(tipoReservaCreada);
    } catch (error) {
        // Devolver el código de estado 400 junto con el mensaje de error específico
        res.status(400).json({ error: error.message });
    }
}