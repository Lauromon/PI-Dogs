const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lifeSpan: {
      type: DataTypes.STRING,
      allowNull:false,
      field: 'life_span'
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isInt: {
          msg: "Must be an integer number"
        }
      }
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isInt: {
          msg: "Must be an integer number"
        }
      }
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      field: 'created_at',
      allowNull: false,
      defaultValue: Sequelize.NOW,
    }

  },{
    tableName: 'breeds',
    timestamps: false,
});
};
