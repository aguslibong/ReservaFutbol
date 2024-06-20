import { DataTypes } from "sequelize";
import sequelize from '../../db/db.js';

//Llamo a la tablas que necesito para sus claves, y referenciarlas en esta como clave foreneas

import Cancha from "./cancha-model.js"; 
//import Cliente from "./Cliente-model.js"
import TipoReserva from "./tipoReserva-model.js"

import Cliente from './cliente-model.js'

const Reserva = sequelize.define("Reserva", {
    idReserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fechaReserva: { type: DataTypes.DATE },
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
    comprobante: { type: DataTypes.TEXT },
    hora: { type: DataTypes.TIME }
}, {
    tableName: "Reserva",
    timestamps: false
});

   // Definir la relación
    Cancha.hasMany(Reserva, {
            foreignKey: 'idCancha',
            sourceKey: 'idCancha',
            onDelete: 'CASCADE'
        });
  
    Reserva.belongsTo(Cancha, {
            foreignKey: 'idCancha',
            targetKey: 'idCancha',
        });
    TipoReserva.hasMany(Reserva, {
            foreignKey: 'idTipoReserva',
            sourceKey: 'idTipoReserva',
            onDelete: 'CASCADE'
        });
  
    Reserva.belongsTo(TipoReserva, {
            foreignKey: 'idTipoReserva',
            targetKey: 'idTipoReserva',
        });
 
    Cliente.hasMany(Reserva, {
            foreignKey: 'idCliente',
            sourceKey: 'idCliente',
            onDelete: 'CASCADE'
        });
    Reserva.belongsTo(Cliente, {
            foreignKey: 'idCliente',
            targetKey: 'idCliente',
        });

export default Reserva; 