import db from "../models/index.js";

export const listVehicles = async (req, res) => {
  try {
    const vehicles = await db.Vehicle.findAll({
      include: [{ model: db.User, as: "owner", attributes: ["id", "name", "email", "phone"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(
      vehicles.map((v) => ({
        id: v.id,
        ownerId: v.ownerId,
        make: v.make,
        model: v.model,
        year: v.year,
        pricePerDay: Number(v.pricePerDay),
        type: v.type,
        seats: v.seats,
        fuel: v.fuel,
        location: v.location,
        rating: v.rating ? Number(v.rating) : null,
        images: v.images || [],
        available: v.available,
        owner: v.owner,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to list vehicles", error: err.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id, {
      include: [{ model: db.User, as: "owner", attributes: ["id", "name", "email", "phone"] }],
    });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({
      id: vehicle.id,
      ownerId: vehicle.ownerId,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: Number(vehicle.pricePerDay),
      type: vehicle.type,
      seats: vehicle.seats,
      fuel: vehicle.fuel,
      location: vehicle.location,
      rating: vehicle.rating ? Number(vehicle.rating) : null,
      images: vehicle.images || [],
      available: vehicle.available,
      owner: vehicle.owner,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get vehicle", error: err.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    if (req.user.role !== "owner") return res.status(403).json({ message: "Owners only" });
    const { make, model, year, pricePerDay, type, seats, fuel, location, images } = req.body;
    const vehicle = await db.Vehicle.create({
      ownerId: req.user.id,
      make,
      model,
      year,
      pricePerDay,
      type,
      seats,
      fuel,
      location,
      images,
    });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Failed to create vehicle", error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (vehicle.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await vehicle.update(req.body);
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Failed to update vehicle", error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (vehicle.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await vehicle.destroy();
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle", error: err.message });
  }
};

export const listOwnerVehicles = async (req, res) => {
  try {
    if (req.user.role !== "owner") return res.status(403).json({ message: "Owners only" });
    const vehicles = await db.Vehicle.findAll({ where: { ownerId: req.user.id } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Failed to list owner vehicles", error: err.message });
  }
};

