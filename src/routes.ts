import { Router, Request, Response } from 'express'

import { GetGeralVendas } from './controllers/TodosOsControllers/GetVendasController';

const router = Router();

router.get('/vendasGeral', new GetGeralVendas().ex)

export { router }