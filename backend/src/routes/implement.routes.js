import { Router } from "express";
import { createImplement, getImplementByname, getImplements, deleteImplement, updateImplement } from "../controllers/implement.controller.js";
import { isAdmin, isManager, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", authorizeRoles("administrador", "encargado"), createImplement);//http://localhost:3000/api/implement/create

router.get("/", getImplements);//http://localhost:3000/api/implement/

router.get("/1", getImplementByname);//http://localhost:3000/api/implement/1

router.delete("/:id", authorizeRoles("administrador", "encargado"), deleteImplement);//http://localhost:3000/api/implement/:id

router.put("/:id", authorizeRoles("administrador", "encargado"), updateImplement);//http://localhost:3000/api/implement/:id

export default router;