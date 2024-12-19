module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Result', {
      resultId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      operatorStatusConfirmation: {
        type: DataTypes.ENUM('completed','in progress','student was absent on slot time','sample issue','technical issue'),
        allowNull: true,
      },
      studentConfirmation: {
        type: DataTypes.ENUM('All Results not collected','All Results collected'),
        allowNull: true,
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