import { DataTypes } from 'sequelize';
import sequelize from '../../db/db.js';

const TipoReserva = sequelize.define('TipoReserva', {
    idTipoReserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'TipoReserva',
    timestamps: false,
});

export default TipoReserva;
