const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true
      }
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull:false
    },

    weight:{
      type: DataTypes.STRING,
      allowNull:false
    },

    height:{
      type: DataTypes.STRING,
      allowNull:false
    },

    image:{
      type: DataTypes.TEXT,
      unique: true
    },

    createdAt: {
      type: DataTypes.DATEONLY,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    }

  },{
    timestamps: false,
});
};
