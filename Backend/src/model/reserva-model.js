import { DataTypes } from "sequelize";
import sequelize from '../../db/db.js';

// Importar las tablas necesarias para las claves foráneas
import Cancha from "./cancha-model.js"; 
import TipoReserva from "./tipoReserva-model.js";
import Cliente from './cliente-model.js';

const Reserva = sequelize.define("Reserva", {
    idReserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaReserva: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idCancha: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cancha,
            key: 'idCancha'
        }
    },
    idCliente: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'idCliente'
        }
    },
    idTipoReserva: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoReserva,
            key: 'idTipoReserva'
        }
    },
    comprobante: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: "Reserva",
    timestamps: false
});

// Definir las asociaciones
Cancha.hasMany(Reserva, {
    foreignKey: 'idCancha',
    onDelete: 'CASCADE'
});

Reserva.belongsTo(Cancha, {
    foreignKey: 'idCancha',
});

TipoReserva.hasMany(Reserva, {
    foreignKey: 'idTipoReserva',
    onDelete: 'CASCADE'
});

Reserva.belongsTo(TipoReserva, {
    foreignKey: 'idTipoReserva',
});

Cliente.hasMany(Reserva, {
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
});

Reserva.belongsTo(Cliente, {
    foreignKey: 'idCliente'
});

export default Reserva;
