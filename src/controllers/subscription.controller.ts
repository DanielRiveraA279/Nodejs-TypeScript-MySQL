import {Request, Response} from 'express';
import {route, GET, POST, PUT, DELETE} from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';

@route('/subscriptions')
export class SubscriptionController { 

    constructor (
        private readonly subscriptionService: SubscriptionService
    ){}

    @GET()
    public async all(req: Request, res: Response) {
        res.send(
            await this.subscriptionService.all() //regresa todo los registros del servicio que provee el repositorio desde MySQL
        );
    }

    // subscription/1
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        const id = parseInt(req.params.id); //convertimos a entero

       const result = await this.subscriptionService.find(id);


       if(result) {
           res.send(result);
       } else {
           res.status(404).send();
       }
    }

    @POST()
    public async store(req: Request, res: Response) {
        await this.subscriptionService.store({
            user_id: req.body.user_id,
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionCreateDto); //tipar con Dto

        res.send();

    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        const id = parseInt(req.params.id); //convertimos a entero

        await this.subscriptionService.update(id, {
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionUpdateDto); //tipar con Dto

        res.send();
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.subscriptionService.remove(id);
        res.send();
    }

}