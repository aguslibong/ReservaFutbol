import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { Reservas, ReservasPost, ReservasPut } from "../service/reservas/reserva.service.js"
import { TipoReservasGet, TipoReservasPost, TipoReservasPut } from "../service/reservas/tipoReserva.service.js"
import { registrarCancha, getCancha, editarCancha, eliminarCancha } from '../service/canchas/canchas.service.js';
import { registrarTipoCancha, getTipoCancha, editarTipoCancha, eliminarTipoCancha } from '../service/canchas/tipoCancha.service.js';
import { registrarCliente, getCliente, editarCliente, eliminarCliente } from '../service/clientes/clientes.service.js';
import { registrarTipoDocumento, getTipoDocumento, editarTipoDocumento, eliminarTipoDocumento } from '../service/clientes/TipoDocumento.service.js';


const router = express.Router();


// router para Reservas ================================================================================================================
//get
router.get('/reserva', Reservas);
router.get('/reserva/:id', Reservas);

//post

router.post('/reserva', ReservasPost)

// PUT
router.put('/reserva/:id', ReservasPut)
//Delete



// router para Tipo de reserva ================================================================================================================

// GET

router.get('/tipoReserva', TipoReservasGet)
router.get('/tipoReserva/:id', TipoReservasGet)
// POST

router.post('/tipoReserva', TipoReservasPost)

// PUT

router.put('/tipoReserva/:id', TipoReservasPut)

// router para Canchas ================================================================================================================

// GET

router.get('/cancha/:id', getCancha);
router.get('/cancha', getCancha);

//POST
router.post('/cancha', async (req, res) => {
    try {
        const cancha = await registrarCancha(req.body);
        return res.json(cancha);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar la cancha' });
    }
});

// PUT
//Nota: No se olviden de importar el archivo de manejo de errores
router.put('/cancha', async (req, res) => {
    try {
        const cancha = await editarCancha(req.body);
        return res.json(cancha);
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
router.delete('/cancha/:id', async (req, res) => {
    try {
        const idCancha = req.params.id
        console.log(idCancha)
        const resultado = await eliminarCancha(idCancha);
        return res.json(resultado);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
})


// router para TIPOCanchas ================================================================================================================
// GET
router.get('/tipocancha/:id', getTipoCancha);
router.get('/tipocancha', getTipoCancha);

//POST
router.post('/tipocancha', async (req, res) => {
    try {
        const tipocancha = await registrarTipoCancha(req.body);
        return res.json(tipocancha);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar la cancha' });
    }
});

// PUT
//Nota: No se olviden de importar el archivo de manejo de errores
router.put('/tipocancha', async (req, res) => {
    try {
        const tipocancha = await editarTipoCancha(req.body);
        return res.json(tipocancha);
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
router.delete('/tipocancha/:id', async (req, res) => {
    try {
        const idTipoCancha = req.params.id
        console.log(idTipoCancha)
        const resultado = await eliminarTipoCancha(idTipoCancha);
        return res.json(resultado);
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return res.status(404).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error imprevisto. Intente nuevamente' });
    }
})

// router para Clientes ================================================================================================================
// GET


export default router;

