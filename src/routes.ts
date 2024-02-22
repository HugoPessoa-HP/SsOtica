import { Router, Request, Response } from 'express'
import { GetMuquicabaControllerVendas } from './controllers/01muquicaba/GetMuquicabaControllerVendas'
import { GetGuarapariControllerVendas } from './controllers/02guarapari/GetGuarapariControllerVendas';

const router = Router();

router.get('/vendasMuquicaba', new GetMuquicabaControllerVendas().ex)
router.get('/vendasGuarapari', new GetGuarapariControllerVendas().ex)

export { router }