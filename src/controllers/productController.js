import { db } from '../database/db.js'

export async function produtos(req, res) {
  try {
    const todosProdutos = await db.collection('produtos').find().toArray()
    res.send(todosProdutos)
  } catch (error) {
    console.error(error.response)
  }
}
export async function cadastrarProduto(req, res) {
  try {
    const infoProdutos = req.body
    await db.collection('produtos').insertOne(infoProdutos)
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(401)
  }
}
