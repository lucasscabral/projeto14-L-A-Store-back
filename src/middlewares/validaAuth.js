import { cadastroSchema } from "../schemas/authSchema.js";
import { db } from "../database/db.js";

export async function validaCadastro(req, res, next) {
  const user = req.body;

  const userExists = await db
    .collection("usuarios")
    .findOne({ email: user.email });

  if (userExists) {
    return res.sendStatus(409);
  }

  const { error } = cadastroSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  next();
}

/* export async function validateSignInSchema(req, res, next) {
  const user = req.body;

  const { error } = loginSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }
  next();
} */
