import express from 'express';
import dbInit from './db/db-init.js';
import routerReservas from './src/router/router-Reservas.js'; 
import routerCanchas from './src/router/router-Canchas.js'; 
import routerClientes from './src/router/router-Clientes.js'; 
import routerTipoReserva from './src/router/router-TipoReserva.js';
import routerTipoCancha from './src/router/router-TipoCancha.js'
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
const port = process.env.PORT || 3000;

// Inicializar la base de datos
dbInit();

// Rutas protegidas
app.use('/api', routerReservas); 
app.use('/api', routerTipoReserva); 
app.use('/api', routerCanchas);
app.use('/api', routerTipoCancha);
app.use('/api', routerClientes);

app.get("/", (_, res) => {
    res.send("Servidor iniciado y escuchando ...");
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

export default app;
