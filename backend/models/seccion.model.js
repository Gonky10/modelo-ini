const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seccion = sequelize.define('Seccion', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'secciones',
  timestamps: false,
});

module.exports = Seccion;
