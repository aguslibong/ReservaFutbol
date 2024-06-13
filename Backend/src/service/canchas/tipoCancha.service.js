import express from "express";
import sequelize from "../../../db/db.js"
import TipoCancha from "../../model/tipoCancha-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

// METODO GET
export const getTipoCancha = async (req, res) => {
    try {
        console.log(req.params.id)
        if (req.params.id) {
            const id = req.params.id;
            const cancha= await TipoCancha.findOne({
                where: {
                    idTipoCancha: id
                }
            });
            res.json(cancha);
        } else {
            const cancha = await TipoCancha.findAll();
            res.json(cancha)
        }

    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}

//METODO POST 
export const registrarTipoCancha = async (TipocanchaNueva) => {
    try {
        const resultado = await TipoCancha.create({
            descripcion: TipocanchaNueva.descripcion,
        });
        //console.log('insertar Cancha', resultado);
        return {
            id: resultado.dataValues.idTipoCancha
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la cancha');
    }
};


// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const editarTipoCancha = async (TipocanchaEdit) => {
    try {
        const cancha = await TipoCancha.findOne({
            where: {
                idTipoCancha: TipocanchaEdit.idTipoCancha
            },
        });

        if (!cancha) {
            throw new ResourceNotFound("Cancha no encontrada");
        }

        await TipoCancha.update(
            {
                descripcion: TipocanchaEdit.descripcion,
            },
            {
                where: { idTipoCancha: TipocanchaEdit.idTipoCancha }
            }
        );

        return { idTipoCancha: TipocanchaEdit.idTipoCancha };
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la cancha');
    }
};

//METODO DELETE
export const eliminarTipoCancha = async (idTipoCanchaEliminar) => {
    try{
        const cancha = await TipoCancha.findOne({
            where: {
                idTipoCancha: idTipoCanchaEliminar
            }
        })
        if (!cancha){
            throw new ResourceNotFound("Cancha no encontrada");
        }
        await TipoCancha.destroy({
            where: {
                idTipoCancha: idTipoCanchaEliminar
            }
        })
        return { message: 'Cancha eliminada exitosamente' };
    }
    catch (error){
        throw new Error('Error al eliminar la cancha')
    }
    
}