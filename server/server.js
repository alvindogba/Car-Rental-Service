import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'
import db from './models/index.js';
import customerRouter from './Router/custormerRouts.js';
import vehicleRouter from './Router/vehicleRoutes.js';
import bookingRouter from './Router/bookingRoutes.js';
import paymentRouter from './Router/paymentRoutes.js';
// import { createApiUser, generateMomoApiKey } from './Utils/momo.js';


const app = express()
const port = 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/auth", customerRouter);
app.use("/vehicles", vehicleRouter);
app.use("/bookings", bookingRouter);
app.use("/payments", paymentRouter);



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
