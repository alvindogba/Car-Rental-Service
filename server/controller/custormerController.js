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
    // Create JWT
    const token = jwt.sign(
      { id: customer.id, email: customer.email, role: customer.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
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

// Get current user from token
export const currentUser = async (req, res) => {
  try {
    const { id } = req.user; // set by requireAuth
    const customer = await db.User.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      phone: customer.phone,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Allow user update only themselves, or admins (not defined) — for now self-only
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { name, email, password, role, phone } = req.body;
    const updates = { name, email, role, phone };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    const [count] = await db.User.update(updates, { where: { id } });
    if (!count) return res.status(404).json({ message: "User not found" });
    const customer = await db.User.findByPk(id);
    res.status(200).json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      phone: customer.phone,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const count = await db.User.destroy({ where: { id } });
    if (!count) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
