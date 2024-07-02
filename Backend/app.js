import express from 'express';
import dbInit from './db/db-init.js';
import routerReservas from './src/router/router-Reservas.js'; 
import routerCanchas from './src/router/router-Canchas.js'; 
import routerClientes from './src/router/router-Clientes.js'; 
import routerTipoReserva from './src/router/router-TipoReserva.js';
import routerTipoCancha from './src/router/router-TipoCancha.js'
import routerUsuario from'./src/router/router-Usuario.js'
import cors from 'cors';
import { verifyToken, isAdmin, isAdminOrMember } from './src/middleware/autorizacion.js'; // Importar middlewares

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar la base de datos
dbInit();

// Rutas protegidas
app.use('/api/reserva', verifyToken, isAdminOrMember, routerReservas); 
app.use('/api/tiporeserva', verifyToken, isAdmin, routerTipoReserva); 
app.use('/api/cancha', verifyToken, isAdminOrMember, routerCanchas);
app.use('/api/tipocancha', verifyToken, isAdmin, routerTipoReserva);
app.use('/api/cliente', verifyToken, isAdmin, routerClientes);
app.use('/api', routerUsuario)

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
