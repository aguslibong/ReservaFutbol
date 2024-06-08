import { DataTypes } from 'sequelize';
import sequelize from '../../db/db.js';

const TipoCancha = sequelize.define('TipoCancha', {
    idTipoCancha: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    //tableName: 'TipoCancha',
    timestamps: false,
});

export default TipoCancha;
