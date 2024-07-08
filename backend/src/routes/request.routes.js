//El usuario puede ver disponibilidad, crear una peticion de implemento, eliminar una peticion de implemento 
//y puede editar su peticion de implemento utilizando sus credenciales de alumno
import { Router } from "express";
import { createRequest, getRequest, updateRequest, deleteRequest } from "../controllers/request.controller.js";

const router = Router();

// Ruta para crear peticion
router.post("/", createRequest);

// Ruta para obtener peticion
router.get("/:id", getRequest);

// Ruta para modificar peticion
router.put("/:id", updateRequest);

// Ruta para eliminar peticion
router.delete("/:id", deleteRequest);

export default router;
