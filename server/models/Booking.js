export default (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      renterId: { type: DataTypes.UUID, allowNull: false },
      vehicleId: { type: DataTypes.UUID, allowNull: false },
      startDate: { type: DataTypes.DATEONLY, allowNull: false },
      endDate: { type: DataTypes.DATEONLY, allowNull: false },
      totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
      },
      paymentIntentId: { type: DataTypes.STRING, allowNull: true },
      clientSecret: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "booking",
      timestamps: true,
      underscored: true,
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "renterId", as: "renter" });
    Booking.belongsTo(models.Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
  };

  return Booking;
};

