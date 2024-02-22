import { Router, Request, Response } from 'express'
import { GetVendas } from './controllers/Vendas/GetVendasController'

const router = Router();

router.get('/vendasMuquicaba', new GetMuquicaba().ex)
router.get('/venddaGuarapari', new getGuarapari().ex)

export { router }