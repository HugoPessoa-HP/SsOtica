import { Router, Request, Response } from 'express'

import { GetSalesController } from './controllers/AllControllers/GetVendasController';

const router = Router();

router.get('/Sales', new GetSalesController().ex)

export { router }