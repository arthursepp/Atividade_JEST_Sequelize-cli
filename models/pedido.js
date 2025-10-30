'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' })
    }
  }
  Pedido.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};