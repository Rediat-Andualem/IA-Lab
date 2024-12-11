module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
      equipmentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      equipmentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      equipmentModel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guidelines: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      operatorName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      operatorEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      field: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      equipmentTA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      workingStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: true,
    });
  
    return Equipment;
  };