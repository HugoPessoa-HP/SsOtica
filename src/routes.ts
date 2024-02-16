import { Router, Request, Response } from 'express'
import { GetVendasMuquicaba } from './controllers/muquicaba/GetVendasController'

const router = Router();

router.get('/vendasMuquicaba', new GetVendasMuquicaba().ex)

export { router }