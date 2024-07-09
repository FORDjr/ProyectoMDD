// request.routes.js
import { Router } from "express";
import { createRequest, getRequest, getRequestAll, updateRequest, deleteRequest, acceptRequestController } from "../controllers/request.controller.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para crear peticion
router.post("/", createRequest);

// Ruta para obtener todas las peticiones
router.get("/req-all", getRequestAll); //api/request/req-all

// Ruta para obtener peticion
router.get("/get/:id", getRequest);

// Ruta para modificar peticion
router.put("/modify/:id", authorizeRoles, updateRequest);

// Ruta para eliminar peticion
router.delete("/delete/:id", deleteRequest);

//Ruta para aceptar peticiones
router.put("/:id/accept", authorizeRoles, acceptRequestController);

//Actualizar la peticion
router.get("/:id", )

export default router;
