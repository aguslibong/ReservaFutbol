import express from 'express';
import dbInit from './db/db-init.js';
import routerReservas from './src/router/router-Reservas.js'; 
import routerCanchas from './src/router/router-Canchas.js'; 
import routerClientes from './src/router/router-Clientes.js'; 
import cors from 'cors'

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rutas
app.use('/api', routerReservas); // Usar el router importado
app.use('/api', routerCanchas)
app.use('/api', routerClientes)

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

