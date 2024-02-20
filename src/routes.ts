import { Router, Request, Response } from 'express'
import { GetVendasMuquicaba } from './controllers/Muquicaba_01/GetVendasController'

const router = Router();

router.get('/vendasMuquicaba', new GetVendasMuquicaba().ex)

export { router }