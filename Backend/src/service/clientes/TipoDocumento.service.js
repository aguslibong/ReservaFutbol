import express from "express";
import sequelize from "../../../db/db.js"
import TipoDocumento from "../../model/tipoDocumento-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

// METODO GET
export const getTipoDocumento = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const tipoDocumento = await TipoDocumento.findOne({
                where: {
                    idTipoDocumento: id
                }
            });
            console.log(tipoDocumento)
            res.json(tipoDocumento);
        } else {
            const tipoDocumento = await TipoDocumento.findAll();
            console.log(tipoDocumento)
            res.json(tipoDocumento)
        }

    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}

//METODO POST 
export const registrarTipoDocumento = async (tipoDocumentoNueva) => {
    try {
        const resultado = await TipoDocumento.create({
            descripcion: tipoDocumentoNueva.descripcion
        });
        //console.log('insertar TipoDocumento', resultado);
        return {
            id: resultado.dataValues.idTipoDocumento
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la TipoDocumento');
    }
};


// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const editarTipoDocumento = async (tipoDocumentoEdit) => {
    try {
        const tipoDocumento = await TipoDocumento.findOne({
            where: {
                idTipoDocumento: tipoDocumentoEdit.idTipoDocumento
            },
        });

        if (!tipoDocumento) {
            throw new ResourceNotFound("TipoDocumento no encontrada");
        }

        await TipoDocumento.update(
            {
                descripcion: tipoDocumentoEdit.descripcion
            },
            {
                where: { idTipoDocumento: tipoDocumentoEdit.idTipoDocumento }
            }
        );

        return { idTipoDocumento: tipoDocumentoEdit.idTipoDocumento };
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la TipoDocumento');
    }
};

//METODO DELETE
export const eliminarTipoDocumento = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoDocumento = await TipoDocumento.findOne({
            where: {
                idTipoDocumento: id
            }
        })
        if (!tipoDocumento) {
            throw new ResourceNotFound("TipoDocumento no encontrada");
        }
        await TipoDocumento.destroy({
            where: {
                idTipoDocumento: id
            }
        })
        res.json("Se ha eliminado correctamente");
    }
    catch (error) {
        throw new Error('Error al eliminar la TipoDocumento')
    }

}