import { Router } from "express";
import { cadastrar } from "../controllers/authController.js";
import { validaCadastro } from "../middlewares/validaAuth.js";

const router = Router();

router.post("/cadastro", validaCadastro, cadastrar);

export default router;
