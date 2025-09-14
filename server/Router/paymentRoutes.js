import express from "express";
import { requireAuth } from "../controller/middleware/auth.js";
import { createPaymentIntent } from "../controller/paymentController.js";

const paymentRouter = express();

paymentRouter.post("/create-intent", requireAuth, createPaymentIntent);

export default paymentRouter;

