import { DataTypes } from 'sequelize';
import sequelize from '../../db/db.js';


const TipoDocumento = sequelize.define('TipoDocumento', {
   idTipoDocumento: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   descripcion: {
       type: DataTypes.STRING,
       allowNull: false,
   },
}, {
   //tableName: 'TipoDocumento',
   timestamps: false,
});

export default TipoDocumento;