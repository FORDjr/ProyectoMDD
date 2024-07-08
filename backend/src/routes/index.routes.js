"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import implementRoutes from "./implement.routes.js";
/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de peticion */
import requestRoutes from "./request.routes.js";

// Se realiza una instancia de express
const router = Router();
router.use("/implement", implementRoutes);
// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para la peticion (//http://localhost:3000/api/request)
router.use("/request", requestRoutes);

export default router;
