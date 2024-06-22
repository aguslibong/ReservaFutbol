import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { registrarCliente, getCliente, editarCliente, eliminarCliente } from '../service/clientes/clientes.service.js';
import { registrarTipoDocumento, getTipoDocumento, editarTipoDocumento, eliminarTipoDocumento } from '../service/clientes/TipoDocumento.service.js';

const router = express.Router();

// router para Clientes ================================================================================================================
// GET
router.get('/cliente/:id', getCliente);
router.get('/cliente', getCliente);

//POST
router.post('/cliente', async (req, res) => {
    try {
        const cliente = await registrarCliente(req.body);
        return res.json(cliente);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar la cancha' });
    }
});

// PUT
//Nota: No se olviden de importar el archivo de manejo de errores
router.put('/cliente', async (req, res) => {
    try {
        const cliente = await editarCliente(req.body);
        return res.json(cliente);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        if (err instanceof ValidationError) {
            return res.status(400).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
});

//DELETE
router.delete('/cliente/:id', async (req, res) => {
    try {
        const idcliente = req.params.id
        console.log(idcliente)
        const resultado = await eliminarCliente(idcliente);
        return res.json(resultado);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
})


// router para TipoDocumentos ================================================================================================================
// GET
router.get('/TipoDocumento/:id', getTipoDocumento);
router.get('/TipoDocumento', getTipoDocumento);

//POST
router.post('/TipoDocumento', async (req, res) => {
    try {
        const TipoDocumento = await registrarTipoDocumento(req.body);
        return res.json(TipoDocumento);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar la cancha' });
    }
});

// PUT
//Nota: No se olviden de importar el archivo de manejo de errores
router.put('/TipoDocumento', async (req, res) => {
    try {
        const TipoDocumento = await editarTipoDocumento(req.body);
        return res.json(TipoDocumento);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        if (err instanceof ValidationError) {
            return res.status(400).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
});

//DELETE
router.delete('/TipoDocumento/:id', async (req, res) => {
    try {
        const idTipoDocumento = req.params.id
        console.log(idTipoDocumento)
        const resultado = await eliminarTipoDocumento(idTipoDocumento);
        return res.json(resultado);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
})

export default router;