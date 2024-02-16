import express, { Request, Response, NextFunction } from 'express'
//import bodyParser from 'body-parser';
const webhooks = require('node-webhooks');

import { router } from '../routes'

//const morgan = require('morgan');
const app = express();
app.use(express.json());
//app.use(morgan("dev"));

//app.use(bodyParser.urlencoded({ extended: false }))

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        // Se for uma instância do tipo Error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server Error'
    })
})

const registerHooks = () => {
    return new webhooks({
        db: {
            'callback_hook': ['http://localhost:8005/webhook-client']
        }
    })
}

app.listen(3333, () => {
    console.log("Servidor Rodando!!");
})