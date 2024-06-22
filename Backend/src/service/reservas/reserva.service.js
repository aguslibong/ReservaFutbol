import express from "express";
import sequelize from "../../../db/db.js"
import Reserva from "../../../src/model/reserva-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

export const Reservas = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const reservaId = await Reserva.findOne({
                where: {
                    idReserva: id
                }
            });
            res.json(reservaId);
        } else {
            const respuesta = await Reserva.findAll();
            res.json(respuesta);
        }

    }
    catch (error) {
        console.error('Error al buscar Reservas:', error);
        res.status(500).json({ error: 'Error al buscar Reservas' })
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

// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const ReservasPut = async (reservaPut) => {
    const id = req.params.id
    const body = req.body
    try {
        const reservaEditada = req.body;
        const reserva = await Reserva.findOne({
            where: {
                idReserva: reservaPut.idReserva
            },
        });

        if (!reserva) {
            throw new ResourceNotFound("Reserva no encontrada");
        }

        await Reserva.update(
            body,
            {
                where: { idReserva: id}
            }
        );

        res.json("Se ha actualizado correctamente");
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la Reserva');
    }
};