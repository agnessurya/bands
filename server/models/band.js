'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Band.hasMany(models.Member, { foreignKey: "BandId" })
    }
  }
  Band.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg : `Band Name Must Be Unique`},
      validate:{
        notEmpty : {msg : `Band Name Cant be Empty!`},
        notNull:   {msg : `Band Name Cant be Empty!`}
      }
    },
    maxmember: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty : {msg : `Band Max Members Cant be Empty!`},
        notNull:   {msg : `Band Max Members Cant be Empty!`}
      }
    }
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};