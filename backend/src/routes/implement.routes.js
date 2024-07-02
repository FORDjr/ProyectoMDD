"use strict";

import { Router } from "express";

import { createImplement } from "../controllers/implement.controller.js";

import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", isAdmin, createImplement);//http://localhost:3000/api/implement/

export default router;