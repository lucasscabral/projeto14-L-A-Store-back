import { db } from '../database/db.js'

export async function InsereNaSacola(req, res) {
  const numeroProduto = res.locals.numeroProduto
  const token = res.locals.token
  try {
    const usuarioLogado = await db.collection('sessoes').findOne({ token })
    if (!usuarioLogado) {
      return res.status(404).send('Esse usuário não existe')
    }
    const produtoSelecionado = await db
      .collection('produtos')
      .findOne({ numeroProduto })
    if (!produtoSelecionado) {
      res.status(404).send('Esse produto não existe')
      return
    }
    const buscarNaSacola = await db
      .collection('sacola')
      .findOne({ userId: usuarioLogado.userId })
    if (!buscarNaSacola) {
      await db.collection('sacola').insertOne({
        userId: usuarioLogado.userId,
        sacola: [produtoSelecionado]
      })
      return res.status(201).send(produtoSelecionado)
    }

    await db.collection('sacola').updateOne(
      {
        userId: usuarioLogado.userId
      },
      { $push: { sacola: produtoSelecionado } }
    )
    res.status(200).send(produtoSelecionado)
  } catch (error) {
    res.send(error)
  }
}
export async function DeletaDaSacola(req, res) {
  const numeroProduto = res.locals.numeroProduto
  const token = res.locals.token

  try {
    const usuarioLogado = await db.collection('sessoes').findOne({ token })
    if (!usuarioLogado) {
      return res.status(404).send('Esse usuário não existe')
    }
    const produtoSelecionado = await db
      .collection('produtos')
      .findOne({ numeroProduto })
    if (!produtoSelecionado) {
      res.status(404).send('Esse produto não existe')
      return
    }
    const buscarNaSacola = await db
      .collection('sacola')
      .findOne({ userId: usuarioLogado.userId })
    if (!buscarNaSacola) {
      return res.sendStatus(404)
    }

    await db.collection('sacola').updateOne(
      {},
      {
        $pull: {
          sacola: {
            numeroProduto: produtoSelecionado.numeroProduto,
            nome: produtoSelecionado.nome
          }
        }
      }
    )
    res.status(200).send(produtoSelecionado)
  } catch (error) {
    res.send(error)
  }
}
export async function GetNaSacola(req, res) {
  const token = res.locals.token
  try {
    const user = await db.collection('sessoes').findOne({ token })
    const produtosNaSacola = await db
      .collection('sacola')
      .find({ userId: user.userId })
      .toArray()
    res.send(produtosNaSacola)
  } catch (error) {
    res.sendStatus(error)
  }
}
