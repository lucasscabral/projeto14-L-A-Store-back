export async function sacolaCheck(req, res, next) {
  const { numeroProduto } = req.body
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '')
  if (!token) {
    res.status(404).send('Esse usuário não está logado')
    return
  }
  res.locals.numeroProduto = numeroProduto
  res.locals.token = token
  next()
}
