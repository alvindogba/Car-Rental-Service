import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Secret for JWT (replace with env variable in real project)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Create new customer
export const createNewCustomer = async (req, res) => {
  console.log("req.body", req.body)
  const { name, email, phone, role, password } = req.body;

  try {
    // Check if customer already exists
    const existCustomer = await db.User.findOne({
      where: { email, role }
    });

    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await db.User.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword
    });

    res.status(201).json({ message: "Customer created", customer });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Login customer
export const customerLogIn = async (req, res) => {
  console.log("req.body", req.body)
  const { email, password } = req.body;

  try {
    const customer = await db.User.findOne({
      where: { email }
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log("customer", customer)

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, customer.password);
    console.log("isMatch", isMatch)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: customer.id, email: customer.email, role: customer.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("token", token)
    res.status(200).json({
  
      token,
      user: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
