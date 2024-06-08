import express from "express";
import sequelize from "../../../db/db.js"
import Cancha from "../../model/cancha-model.js"

// METODO GET
export const getCancha = async (req, res) => {
    try {
        console.log(req.params.id)
        if (req.params.id) {
            const id = req.params.id;
            const cancha= await Cancha.findOne({
                where: {
                    idCancha: id
                }
            });
            res.json(cancha);
        } else {
            const cancha = await Cancha.findAll();
            res.json(cancha)
        }

    } catch (error) {
        console.error('Error al buscar países:', error);
        res.status(500).json({ error: 'Error al buscar países' });
    }
}

//METODO POST 
