import express from "express";
import sequelize from "../../../db/db.js"
import Cliente from "../../model/cliente-model.js"
import { ResourceNotFound, ValidationError } from '../../error/errors.js'; //menejo de errores
import { where } from "sequelize";

// METODO GET
export const getCliente = async (req, res) => {
    try {
        console.log(req.params.id)
        if (req.params.id) {
            const id = req.params.id;
            const cliente = await Cliente.findOne({
                where: {
                    idCliente: id
                }
            });
            res.json(cliente);
        } else {
            const cliente = await Cliente.findAll();
            res.json(cliente)
        }

    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}

//METODO POST 
export const registrarCliente = async (clienteNueva) => {
    try {
        const resultado = await Cliente.create({
            nombre: clienteNueva.nombre,
            apellido: clienteNueva.apellido,
            foto: clienteNueva.foto,
            nroDoc: clienteNueva.nroDoc,
            idTipoDocumento: clienteNueva.idTipoDocumento
        });
        //console.log('insertar Cliente', resultado);
        return {
            id: resultado.dataValues.idCliente
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la Cliente');
    }
};


// METODO PUT
//Nota: No se olviden de importar el archivo de manejo de errores
export const editarCliente = async (clienteEdit) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                idCliente: clienteEdit.idCliente
            },
        });

        if (!cliente) {
            throw new ResourceNotFound("Cliente no encontrada");
        }

        await Cliente.update(
            {
                nombre: clienteEdit.nombre,
                apellido: clienteEdit.apellido,
                foto: clienteEdit.foto,
                nroDoc: clienteEdit.nroDoc,
                idTipoDocumento: clienteEdit.idTipoDocumento
            },
            {
                where: { idCliente: clienteEdit.idCliente }
            }
        );

        return { idCliente: clienteEdit.idCliente };
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la Cliente');
    }
};

//METODO DELETE
export const eliminarCliente = async (idClienteEliminar) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                idCliente: idClienteEliminar
            }
        })
        if (!cliente) {
            throw new ResourceNotFound("Cliente no encontrada");
        }
        await Cliente.destroy({
            where: {
                idCliente: idClienteEliminar
            }
        })
        return { message: 'Cliente eliminada exitosamente' };
    }
    catch (error) {
        throw new Error('Error al eliminar la Cliente')
    }

}