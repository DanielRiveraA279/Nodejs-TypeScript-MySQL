import {Request, Response} from 'express';
import {route, GET} from 'awilix-express';
import { TestService } from '../services/test.service';

@route('/check') //esta clase responde a la ruta principal check
export class DefaultController {
    constructor(private readonly testService: TestService) {} //inyeccion de dependencias

    @GET() //el controlador tiene una accion llamada index y se puede acceder atravez del metodo GET
    public index (req: Request, res: Response): void {
        res.send({
            NODE_ENV: process.env.NODE_ENV,
            APP_ENV: process.env.APP_ENV
        });
    }
    
    @route('/test')
    @GET()
    public test (req: Request, res: Response): void {
       res.send(this.testService.get());
    }
}