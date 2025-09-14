import Stripe from "stripe";
import db from "../models/index.js";

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export const createPaymentIntent = async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ message: "Stripe not configured" });
    const { bookingId, currency = "usd" } = req.body;
    const booking = await db.Booking.findByPk(bookingId, { include: [{ model: db.Vehicle, as: "vehicle" }] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    // Only renter or owner can initiate? Typically renter; restrict to renter
    if (booking.renterId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    // amount in smallest currency unit
    const amount = Math.round(Number(booking.totalPrice) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        bookingId: booking.id,
        vehicleId: booking.vehicleId,
        renterId: booking.renterId,
      },
      automatic_payment_methods: { enabled: true },
    });

    booking.paymentIntentId = paymentIntent.id;
    booking.clientSecret = paymentIntent.client_secret;
    await booking.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment intent", error: err.message });
  }
};

