import express from "express";
import { requireAuth } from "../controller/middleware/auth.js";
import { createBooking, getRenterBookings, getOwnerBookings, getBookingById, updateBookingStatus } from "../controller/bookingController.js";

const bookingRouter = express();

bookingRouter.post("/", requireAuth, createBooking);
bookingRouter.get("/me", requireAuth, getRenterBookings);
bookingRouter.get("/owner", requireAuth, getOwnerBookings);
bookingRouter.get("/:id", requireAuth, getBookingById);
bookingRouter.put("/:id/status", requireAuth, updateBookingStatus);

export default bookingRouter;

