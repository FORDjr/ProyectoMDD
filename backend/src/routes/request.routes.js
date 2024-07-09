// request.routes.js
import { Router } from "express";
import { createRequest, getRequest, getForms, updateRequest, deleteRequest, acceptRequestController } from "../controllers/request.controller.js";
import { isAdmin, isManager } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para crear peticion
router.post("/", createRequest);

// Ruta para obtener peticion
router.get("/:id", getRequest);

// Ruta para obtener todas las peticiones
router.get("/req-all-manager", (isManager), getForms);
router.get("/req-all-admin", (isAdmin), getForms);

// Ruta para modificar peticion
router.put("/:id", [isAdmin, isManager], updateRequest);

// Ruta para eliminar peticion
router.delete("/:id", deleteRequest);

//Ruta para aceptar peticiones
router.put("/:id/accept", [isAdmin, isManager], acceptRequestController);

//Actualizar la peticion
router.get("/:id", )

export default router;
