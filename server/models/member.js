'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.Band, { foreignKey: "BandId" })
    }
  }
  Member.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty : {msg : `Member Name Cant be Empty!`},
        notNull:   {msg : `Member Name Cant be Empty!`}
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty : {msg : `Member Position Cant be Empty!`},
        notNull:   {msg : `Member Position Cant be Empty!`}
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};