import { Router } from "express";
import { cadastrar, login } from "../controllers/authController.js";
import { validaCadastro, validaLogin } from "../middlewares/validaAuth.js";

const router = Router();

router.post("/cadastro", validaCadastro, cadastrar);
router.post("/login", validaLogin, login);

export default router;
