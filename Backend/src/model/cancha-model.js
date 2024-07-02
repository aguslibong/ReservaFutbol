import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../../db/db.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  instanceMethods: {
    validPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
});

export default User;
