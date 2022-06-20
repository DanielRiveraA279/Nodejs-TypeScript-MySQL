import {Request, Response} from 'express';
import {route, GET} from 'awilix-express';

@route('/') //esta clase responde a la ruta raiz
export class DefaultController {
    @GET() //el controlador tiene una accion llamada index y se puede acceder atravez del metodo GET
    public index (req: Request, res: Response): void {
        res.send({
            NODE_ENV: process.env.NODE_ENV,
            APP_ENV: process.env.APP_ENV
        });
    }
}