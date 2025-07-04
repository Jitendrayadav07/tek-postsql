//models/ShillCategory.js
module.exports = (sequelize , DataTypes) => {
    const shillCategory = sequelize.define('shill_category', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      shill_category:{
          type: DataTypes.STRING
      }
    },{
      timestamps: true,
      underscored: true
    });
    return shillCategory;
}
