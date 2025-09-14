import express from "express";
import { requireAuth } from "../controller/middleware/auth.js";
import { listVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, listOwnerVehicles } from "../controller/vehicleController.js";

const vehicleRouter = express();

vehicleRouter.get("/", listVehicles);
vehicleRouter.get("/owner", requireAuth, listOwnerVehicles);
vehicleRouter.get("/:id", getVehicleById);
vehicleRouter.post("/", requireAuth, createVehicle);
vehicleRouter.put("/:id", requireAuth, updateVehicle);
vehicleRouter.delete("/:id", requireAuth, deleteVehicle);

export default vehicleRouter;

