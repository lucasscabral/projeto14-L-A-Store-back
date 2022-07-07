import { db } from "../database/db.js";
import bcrypt from "bcrypt";

export async function cadastrar(req, res) {
  try {
    const user = req.body;

    console.log(user);

    // Caso tudo esteja validado vamos criptografar os dados antes
    // de entrar no banco de dados.
    const senhaCriptografada = bcrypt.hashSync(user.senha, 10);

    //Cadastrar de fato os dados no banco com o a senha criptografada.
    await db
      .collection("usuarios")
      .insertOne({ ...user, senha: senhaCriptografada });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
