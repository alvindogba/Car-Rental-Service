import db from "../models/index.js";
import { Op } from "sequelize";

export const createBooking = async (req, res) => {
  try {
    if (req.user.role !== "renter") return res.status(403).json({ message: "Renters only" });
    const { vehicleId, startDate, endDate } = req.body;
    const vehicle = await db.Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!(start instanceof Date) || !(end instanceof Date) || isNaN(start) || isNaN(end) || end < start) {
      return res.status(400).json({ message: "Invalid dates" });
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((end - start) / oneDay) + 1;
    const totalPrice = (Number(vehicle.pricePerDay) * days).toFixed(2);

    // Ensure no overlapping bookings for vehicle (basic check)
    const overlap = await db.Booking.findOne({
      where: {
        vehicleId,
        status: { [Op.ne]: "cancelled" },
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: endDate } },
        ],
      },
    });
    if (overlap) return res.status(409).json({ message: "Vehicle already booked for selected dates" });

    const booking = await db.Booking.create({
      renterId: req.user.id,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });

    await db.Vehicle.update({ available: false }, { where: { id: vehicleId } });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

export const getRenterBookings = async (req, res) => {
  try {
    const bookings = await db.Booking.findAll({
      where: { renterId: req.user.id },
      include: [{ model: db.Vehicle, as: "vehicle" }],
      order: [["created_at", "DESC"]],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") return res.status(403).json({ message: "Owners only" });
    const bookings = await db.Booking.findAll({
      include: [
        {
          model: db.Vehicle,
          as: "vehicle",
          where: { ownerId: req.user.id },
          required: true,
        },
        { model: db.User, as: "renter", attributes: ["id", "name", "email", "phone"] },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch owner bookings", error: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await db.Booking.findByPk(req.params.id, {
      include: [
        { model: db.Vehicle, as: "vehicle" },
        { model: db.User, as: "renter", attributes: ["id", "name", "email", "phone"] },
      ],
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    // Authorization: renter or owner of the vehicle
    if (booking.renterId !== req.user.id && booking.vehicle.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booking", error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // confirmed | cancelled
    const booking = await db.Booking.findByPk(req.params.id, { include: [{ model: db.Vehicle, as: "vehicle" }] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    // Only owner of the vehicle can change status
    if (booking.vehicle.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
};

