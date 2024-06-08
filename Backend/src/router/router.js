import express from "express";
import sequelize from "../../db/db.js"
import { Reservas , ReservasId } from "../service/reservas/reserva.service.js"


const router = express.Router();


//================================================================================================================
// router para Reservas

router.get('/reservas', Reservas);
router.get('/reservas/:id', ReservasId);




//================================================================================================================
// router para Canchas

export default router;