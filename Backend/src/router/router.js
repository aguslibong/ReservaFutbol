import express from "express";
import sequelize from "../../db/db.js"
import { ResourceNotFound, ValidationError } from '../error/errors.js'; //menejo de errores
import { Reservas, ReservasPost } from "../service/reservas/reserva.service.js"
import { registrarCancha, getCancha, editarCancha, eliminarCancha } from '../service/canchas/canchas.service.js';


const router = express.Router();


// router para Reservas ================================================================================================================
//get
router.get('/reservas', Reservas);
router.get('/reservas/:id', Reservas);

//post

router.post('/reservas', ReservasPost)



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

// router para Clientes ================================================================================================================
// GET


export default router;

