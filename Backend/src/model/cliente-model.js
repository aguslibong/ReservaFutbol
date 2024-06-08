import { DataTypes } from 'sequelize';
import sequelize from '../../db/db.js';
import TipoDocumento from './tipoDocumento-model.js';

const Cliente = sequelize.define( 'Cliente', {
   idCliente: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
   },
   nombre: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   apellido: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   foto: {
       type: DataTypes.STRING,
       allowNull: true,
   },
   nroDoc: {
       type: DataTypes.INTEGER,
       allowNull: false,
   },
   idTipoDocumento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: TipoDocumento,
         key: 'idTipoDocumento'
      }
  },
}, {
   //tableName:  'Cliente',
   timestamps: false,
});

TipoDocumento.hasMany(Cliente, { foreignKey: 'idTipoDocumento' }); 
Cliente.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' }); 

export default Cliente;
