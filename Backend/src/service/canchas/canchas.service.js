import express from "express";
import sequelize from "../../../db/db.js"
import Cancha from "../../model/cancha-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

// METODO GET
export const getCancha = async (req, res) => {
    try {
        console.log(req.params.id)
        if (req.params.id) {
            const id = req.params.id;
            const cancha= await Cancha.findOne({
                where: {
                    idCancha: id
                }
            });
            res.json(cancha);
        } else {
            const cancha = await Cancha.findAll();
            res.json(cancha)
        }

    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}

//METODO POST 
export const registrarCancha = async (canchaNueva) => {
    try {
        const resultado = await Cancha.create({
            fechaMantenimiento: canchaNueva.fechaMantenimiento,
            idTipoCancha: canchaNueva.idTipoCancha,
            descripcion: canchaNueva.descripcion,
            foto: canchaNueva.foto,
        });
        //console.log('insertar Cancha', resultado);
        return {
            id: resultado.dataValues.idCancha
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la cancha');
    }
};


// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const editarCancha = async (canchaEdit) => {
    try {
        const cancha = await Cancha.findOne({
            where: {
                idCancha: canchaEdit.idCancha
            },
        });

        if (!cancha) {
            throw new ResourceNotFound("Cancha no encontrada");
        }

        await Cancha.update(
            {
                fechaMantenimiento: canchaEdit.fechaMantenimiento,
                idTipoCancha: canchaEdit.idTipoCancha,
                descripcion: canchaEdit.descripcion,
                foto: canchaEdit.foto,
            },
            {
                where: { idCancha: canchaEdit.idCancha }
            }
        );

        return { idCancha: canchaEdit.idCancha };
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la cancha');
    }
};

//METODO DELETE
export const eliminarCancha = async (idCanchaEliminar) => {
    try{
        const cancha = await Cancha.findOne({
            where: {
                idCancha: idCanchaEliminar
            }
        })
        if (!cancha){
            throw new ResourceNotFound("Cancha no encontrada");
        }
        await Cancha.destroy({
            where: {
                idCancha: idCanchaEliminar
            }
        })
        return { message: 'Cancha eliminada exitosamente' };
    }
    catch (error){
        throw new Error('Error al eliminar la cancha')
    }
    
}