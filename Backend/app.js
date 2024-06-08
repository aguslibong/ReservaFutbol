import express from 'express';
import dbInit from './db/db-init.js';
import router from './src/router/router.js'; 

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rutas
app.use('/api', router); // Usar el router importado

// Inicializar la base de datos
dbInit();

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

