module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      professorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Professor',
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
      bookedDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slotTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slotDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingStatus: {
        type: DataTypes.ENUM('Book', 'Booked', 'Public Holiday','Booked for other department','Booked for professor'),
        allowNull: false,
      },
      numberOfSamples: {
        type: DataTypes.STRING,
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
      Booking.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Booking.belongsTo(models.Professor, { foreignKey: 'professorId', onDelete: 'CASCADE' });
      Booking.belongsTo(models.Equipment, { foreignKey: 'equipmentId', onDelete: 'CASCADE' });
    };
  
    return Booking;
  };