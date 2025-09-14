export default (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      make: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: false },
      pricePerDay: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      type: { type: DataTypes.STRING, allowNull: true },
      seats: { type: DataTypes.INTEGER, allowNull: true },
      fuel: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      rating: { type: DataTypes.DECIMAL(3, 2), allowNull: true },
      images: { type: DataTypes.JSONB, allowNull: true },
      available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "vehicle",
      timestamps: true,
      underscored: true,
    }
  );

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    Vehicle.hasMany(models.Booking, { foreignKey: "vehicleId", as: "bookings" });
  };

  return Vehicle;
};

