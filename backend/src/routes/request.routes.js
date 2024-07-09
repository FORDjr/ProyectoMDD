// request.routes.js
import { Router } from "express";
import { createRequest, getRequest, getRequestAll, updateRequest, deleteRequest, acceptRequestController, cancelRequest } from "../controllers/request.controller.js";
import { isAdmin, isManager } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para crear peticion
router.post("/", createRequest);



// Ruta para obtener todas las peticiones
router.put("/:id", [isAdmin, isManager],getRequestAll);

// Ruta para modificar peticion
router.put("/:id", [isAdmin, isManager], updateRequest);

// Ruta para eliminar peticion
router.delete("/:id",isAdmin,deleteRequest);

// Ruta para obtener peticion
router.get("/:id", getRequest);

//Ruta para aceptar peticiones
router.put("/:id/accept", [isAdmin, isManager], acceptRequestController);

//Actualizar la peticion
router.get("/:id", )

// Ruta para cancelar peticion
router.put("/:id/cancel", cancelRequest);

export default router;
