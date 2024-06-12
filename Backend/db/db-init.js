import sequelize from "./db.js";
import Cancha from '../src/model/cancha-model.js';
import TipoCancha from '../src/model/tipoCancha-model.js';
import Cliente from '../src/model/cliente-model.js'
import TipoDocumento from '../src/model/tipoDocumento-model.js'
import Reserva from '../src/model/reserva-model.js'
import TipoReserva from '../src/model/tipoReserva-model.js'

async function dbInit() {
    try {
        await sequelize.authenticate();
        // Sincronizar los modelos
        //Estás asegurando que los modelos están disponibles en el contexto de ese archivo, pero no necesitas hacer ninguna referencia adicional a estos modelos dentro de la función dbInit
        // La magia ocurre cuando llamas a sequelize.sync(), ya que Sequelize internamente maneja las relaciones y sincroniza los modelos que están definidos y disponibles en ese contexto.
        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos, LISTO JEFE");
    }
    catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default dbInit;
