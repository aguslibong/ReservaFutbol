import express from "express";
import sequelize from "../../../db/db.js"
import TipoReserva from "../../../src/model/tipoReserva-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

export const TipoReservasGet = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const tipoReserva = await TipoReserva.findOne({
                where: {
                    idTipoReserva: id
                },
            });
            if (!tipoReserva){
                throw new ResourceNotFound("Reserva no encontrada")}
            res.json(tipoReserva);
        } else {
            const respuesta = await TipoReserva.findAll();
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


export const TipoReservasPut = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const tiporeserva = await TipoReserva.findOne({
            where: {
                idTipoReserva: id
            },
        });

        if (!tiporeserva) {
            throw new ResourceNotFound("Tipo Reserva no encontrada");
        }

        await TipoReserva.update(
            body,
            {
                where: { idTipoReserva: id}
            }
        );
        res.json("Se ha actualizado correctamente") 
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

export const TipoReservasDelete = async (req, res) => {

    const id = req.params.id
    try {
        const tiporeserva = await TipoReserva.findOne({
            where: {
                idTipoReserva: id
            },
        });

        if (!tiporeserva) {
            throw new ResourceNotFound("Reserva no encontrada");
        }
        await TipoReserva.destroy(
            { where: { idTipoReserva : id } }
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