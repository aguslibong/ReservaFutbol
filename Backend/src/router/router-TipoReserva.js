import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { TipoReservasGet, TipoReservasPost, TipoReservasPut, TipoReservasDelete, TipoReservasGetById } from "../service/reservas/tipoReserva.service.js"


const router = express.Router();
// router para Tipo de reserva ================================================================================================================

// GET

router.get('/tiporeserva', TipoReservasGet)
router.get('/tiporeserva/:id', TipoReservasGetById)

// POST

router.post('/tiporeserva', TipoReservasPost)

// PUT

router.put('/tiporeserva/:id', TipoReservasPut)

//Delete
router.delete('/tiporeserva/:id', TipoReservasDelete)


export default router;