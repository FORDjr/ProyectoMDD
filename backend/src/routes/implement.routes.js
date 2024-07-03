import { Router } from "express";
import { createImplement, getImplementByname, getImplements, deleteImplement, updateImplement } from "../controllers/implement.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", isAdmin, createImplement);//http://localhost:3000/api/implement/

router.get("/", getImplements);//http://localhost:3000/api/implement/

router.get("/1", getImplementByname);//http://localhost:3000/api/implement/1

router.delete("/:id", isAdmin, deleteImplement);//http://localhost:3000/api/implement/:id

router.put("/:id", isAdmin, updateImplement);//http://localhost:3000/api/implement/:id
export default router;