import { Router } from "express";
import { createForm, getForm, updateForm, deleteForm } from "../controllers/form.controller.js";

const router = Router();

// Ruta para crear formulario
router.post("/", createForm);

// Ruta para obtener formulario
router.get("/:id", getForm);

// Ruta para modificar formulario
router.put("/:id", updateForm);

// Ruta para eliminar formulario
router.delete("/:id", deleteForm);

export default router;
