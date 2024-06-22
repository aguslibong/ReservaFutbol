import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { Reservas, registrarReserva, ReservasPut, ReservasDelete } from "../service/reservas/reserva.service.js"
import { TipoReservasGet, TipoReservasPost, TipoReservasPut, TipoReservasDelete } from "../service/reservas/tipoReserva.service.js"


const router = express.Router();


// router para Reservas ================================================================================================================
//get
router.get('/reserva', Reservas);
router.get('/reserva/:id', Reservas);

//post

router.post('/reserva', async (req, res) => {
    try {
        const cancha = await registrarReserva(req.body);
        return res.json(cancha);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar la cancha' });
    }
});

// PUT
router.put('/reserva/:id', ReservasPut)
//Delete
router.delete('/reserva/:id',ReservasDelete)


// router para Tipo de reserva ================================================================================================================

// GET

router.get('/tipoReserva', TipoReservasGet)
router.get('/tipoReserva/:id', TipoReservasGet)

// POST

router.post('/tipoReserva', TipoReservasPost)

// PUT

router.put('/tipoReserva/:id', TipoReservasPut)

//Delete
router.delete('/tipoReservas/:id', TipoReservasDelete)


export default router;