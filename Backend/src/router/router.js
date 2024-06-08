import express from "express";
import sequelize from "../../db/db.js"
import { Reservas , ReservasId } from "../service/reservas/reserva.service.js"
import {getCancha} from '../service/canchas.service/canchas.service.js'

const router = express.Router();


//================================================================================================================
// router para Reservas

router.get('/reservas', Reservas);
router.get('/reservas/:id', ReservasId);




//================================================================================================================
// router para Canchas

router.get('/cancha/:id', getCancha);
router.get('/cancha', getCancha);


// app.post('/api/peliculas', async (req, res) =>{
//     const pelicula = await peliculasService
//     .insertarPelicula(req.body)
//     return res.json(pelicula);
// });


export default router;