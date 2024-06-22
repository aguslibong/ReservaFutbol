import express from "express";
import sequelize from "../../../db/db.js"
import Reserva from "../../../src/model/reserva-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

export const Reservas = async (req, res) => {
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
export const registrarReserva = async (reservaNueva) => {
    console.log(reservaNueva)
    try {
        const resultado = await Reserva.create({
            fechaReserva: reservaNueva.fechaReserva,
            idCancha: reservaNueva.idCancha,
            idCliente: reservaNueva.idCliente,
            idTipoReserva: reservaNueva.idTipoReserva,
            comprobante: reservaNueva.comprobante,
            hora: reservaNueva.hora
        });
        //console.log('insertar Reserva', resultado);
        return {
            id: resultado.dataValues.idReserva
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la reserva');
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