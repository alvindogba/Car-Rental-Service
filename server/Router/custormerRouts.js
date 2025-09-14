import express from "express";
import { createNewCustomer, customerLogIn, currentUser, updateUser, deleteUser } from "../controller/custormerController.js";
import { requireAuth } from "../controller/middleware/auth.js";

const customerRouter = express();

// Auth routes
customerRouter.post("/signup", createNewCustomer);
customerRouter.post("/login", customerLogIn);

// Authenticated user routes
customerRouter.get("/current-user", requireAuth, currentUser);
customerRouter.put("/update-user/:id", requireAuth, updateUser);
customerRouter.delete("/delete-user/:id", requireAuth, deleteUser);

export default customerRouter;
