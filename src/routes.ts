import { Router, Request, Response } from 'express'
import { GetVendas } from './controllers/Muquicaba_01/GetVendasController'

const router = Router();

router.get('/vendas', new GetVendas().ex)

export { router }