import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { ReservasGet, ReservaPost, ReservasPut, ReservasDelete, ReservasGetById } from "../service/reservas/reserva.service.js"
import { TipoReservasGet, TipoReservasPost, TipoReservasPut, TipoReservasDelete, TipoReservasGetById } from "../service/reservas/tipoReserva.service.js"


const router = express.Router();


// router para Reservas ================================================================================================================
//get
router.get('/reserva', ReservasGet);
router.get('/reserva/:id', ReservasGetById);

//post

router.post('/reserva', ReservaPost);

// PUT
router.put('/reserva/:id', ReservasPut)
//Delete
router.delete('/reserva/:id',ReservasDelete)


// router para Tipo de reserva ================================================================================================================

// GET

router.get('/tipoReserva', TipoReservasGet)
router.get('/tipoReserva/:id', TipoReservasGetById)

// POST

router.post('/tipoReserva', TipoReservasPost)

// PUT

router.put('/tipoReserva/:id', TipoReservasPut)

//Delete
router.delete('/tipoReserva/:id', TipoReservasDelete)


export default router;