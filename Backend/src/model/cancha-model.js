import { DataTypes } from 'sequelize';
import sequelize from '../../db/db.js';
import TipoCancha from './tipoCancha-model.js';

const Cancha = sequelize.define('Cancha', {
    idCancha: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaMantenimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Establecer la fecha actual por defecto
    },
    idTipoCancha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoCancha,
            key: 'idTipoCancha',
        },
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    //tableName: 'Cancha',
    timestamps: false,
});

TipoCancha.hasMany(Cancha, { foreignKey: 'idTipoCancha' }); //1..*
Cancha.belongsTo(TipoCancha, { foreignKey: 'idTipoCancha' }); 

export default Cancha;
