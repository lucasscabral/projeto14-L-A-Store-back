import { Router } from 'express'
import { produtos, cadastrarProduto } from '../controllers/productController.js'

const productRouter = Router()

productRouter.get('/produtos', produtos)
productRouter.post('/produtos', cadastrarProduto)

export default productRouter
