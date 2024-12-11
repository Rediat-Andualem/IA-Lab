module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      professorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Professors',
          key: 'professorId',
        },
      },
      equipmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Equipment',
          key: 'equipmentId',
        },
      },
      bookingDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingStatus: {
        type: DataTypes.ENUM('free', 'occupied'),
        allowNull: false,
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
  
    // Associations
    Booking.associate = models => {
      Booking.belongsTo(models.Professor, { foreignKey: 'professorId', onDelete: 'CASCADE' });
      Booking.belongsTo(models.Equipment, { foreignKey: 'equipmentId', onDelete: 'CASCADE' });
    };
  
    return Booking;
  };