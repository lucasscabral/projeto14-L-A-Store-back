import { Router } from 'express'
import {
  GetNaSacola,
  InsereNaSacola,
  DeletaDaSacola
} from '../controllers/sacolaController.js'
import { sacolaCheck } from '../middlewares/checkoutmiddlewares.js'

const sacolaRouter = Router()

sacolaRouter.get('/checkout', sacolaCheck, GetNaSacola)
sacolaRouter.post('/checkout', sacolaCheck, InsereNaSacola)
sacolaRouter.put('/checkout', sacolaCheck, DeletaDaSacola)

export default sacolaRouter
