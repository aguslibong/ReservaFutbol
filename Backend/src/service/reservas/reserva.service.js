import express from "express";
import sequelize from "../../../db/db.js"
import Reserva from "../../../src/model/reserva-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

export const ReservasGet = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const reserva = await Reserva.findOne({
                where: {
                    idReserva: id
                },
            });
            if (!reserva){
                throw new ResourceNotFound("Reserva no encontrada")}
            res.json(reserva);
        } else {
            const respuesta = await Reserva.findAll();
            res.json(respuesta);
        }

    }
    catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' })
    }
}

//METODO POST 
export const ReservaPost = async (req, res) => {
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
};


// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const ReservasPut = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const reserva = await Reserva.findOne({
            where: {
               idReserva: id
            },
        })
        if (!reserva) {
            throw new ResourceNotFound("Reserva no encontrada");
        }

        await Reserva.update(
            body,
            {
                where: { idReserva: id }
            }
        );

        res.json("Se ha actualizado correctamente");
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
};

// METODO DELETE
//Nota: No se olviden de importar el archivo de manejo de errores

export const ReservasDelete = async (req, res) => {

    const id = req.params.id
    try {
        const reserva = await Reserva.findOne({
            where: {
                idReserva: id
            },
        });

        if (!reserva) {
            throw new ResourceNotFound("Reserva no encontrada");
        }
        await Reserva.destroy(
            { where: { idReserva : id } }
        )
        res.json("Se a eliminado correctamente!")
    }
    catch (err){
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' })
    }
}