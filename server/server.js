import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'
import db from './models/index.js';
import customerRouter from './Router/custormerRouts.js';
import vehicleRouter from './Router/vehicleRoutes.js';
import bookingRouter from './Router/bookingRoutes.js';
import paymentRouter from './Router/paymentRoutes.js';
import stripe from 'stripe';  

const app = express()
const port = 3000
const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL || 'http://192.168.1.121:5173';


//cors middlewares
const allowedOrigins = [
  'https://karnue.com',
  'https://karnue.zongeatech.com',
  'https://karnue-admin.onrender.com',
  'http://localhost:3000',
  'http://192.168.1.121:5173',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle preflight requests (Express 5 requires a valid path pattern)


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/auth", customerRouter);
app.use("/vehicles", vehicleRouter);
app.use("/bookings", bookingRouter);
app.use("/payments", paymentRouter);


//testing payments
app.use("/checkout", async (req, res) => {
console.log("checkout",req.body)
try {
  const { product } = req.body;

  const vehicle = await db.Vehicle.findByPk(product.vehicleId);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  //creating a checkout session
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: "Car Renter Service",
          description: `Book from ${product.startDate} to ${product.endDate}`,
          images: vehicle.images,
        },
        unit_amount: Number(product.totalPrice) * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    // Return user to in-app confirmation step
    success_url: `${CLIENT_URL}/book/${product.vehicleId}?step=confirmation`,
    cancel_url: `${CLIENT_URL}/`,
  })

  res.json({ sessionId: session.id })
} catch (error) {
  console.log(error)
}
})



// Deprecated momo sandbox routes are disabled as we migrated to Stripe

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('DB connection established.');
    if (process.env.DB_SYNC === 'true') {
      await db.sequelize.sync();
      console.log('DB synced.');
    }
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
  console.log(`Server is running on port ${port}`);
});
