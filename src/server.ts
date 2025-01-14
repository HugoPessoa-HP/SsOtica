import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes'

const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server Error'
    })
})

app.listen(3003, () => {
    console.log("Server running!!");
})