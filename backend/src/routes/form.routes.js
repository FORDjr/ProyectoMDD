import { Router } from "express";

/** Controlador de formularios */
import { createForm, getForm, getForms, updateForm, deleteForm } from "../controllers/form.controller.js";

import { isAdmin } from "../middlewares/auth.middleware.js";
import { isManager } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para crear formulario
router.post("/", createForm);

// Ruta para obtener formulario
router.get("/:id", getForm);

// Ruta para modificar formulario
router.put("/:id", updateForm);

// Ruta para eliminar formulario
router.delete("/:id", deleteForm);

// Ruta para obtener los formularios
router.get("/:forms-all", getForms);


// Rutas para el encargado
router.post("/", isManager, createForm); //http://localhost:3000/api/user/
router.get("/", isManager, getForm);    //http://localhost:3000/api/user/
router.get("/forms-all", isManager, getForms);    //http://localhost:3000/api/user/forms-all
router.put("/", isManager, updateForm); //http://localhost:3000/api/user/
router.delete("/", isManager, deleteForm); //http://localhost:3000/api/user/

// Rutas para el administrador
router.post("/", isAdmin, createForm); //http://localhost:3000/api/user/
router.get("/", isAdmin, getForm);    //http://localhost:3000/api/user/
router.get("/forms-all", isAdmin, getForms);    //http://localhost:3000/api/user/forms-all
router.put("/", isAdmin, updateForm); //http://localhost:3000/api/user/
router.delete("/", isAdmin, deleteForm); //http://localhost:3000/api/user/

export default router;
