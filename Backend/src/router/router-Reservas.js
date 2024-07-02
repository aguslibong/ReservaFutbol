import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { ReservasGet, ReservaPost, ReservasPut, ReservasDelete, ReservasGetById } from "../service/reservas/reserva.service.js"



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


export default router;