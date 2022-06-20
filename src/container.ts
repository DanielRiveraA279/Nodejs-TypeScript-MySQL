import express from "express";
import {createContainer, asClass} from 'awilix';
import {scopePerRequest} from 'awilix-express';
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from "./services/subscription.service";
import { MovementMySQLRepository } from "./services/repositories/impl/mysql/movement.respository";
import { BalanceMySQLRepository } from "./services/repositories/impl/mysql/balance.repository";
import { MovementService } from "./services/movement.service";


// services -> repositories -> imple mysql

//configuramos el container(contenedor de clases) y express para unirlos y puedan trabajar juntos
export default (app: express.Application)  => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    
    ///contenedor de clases, que puede almacenar varias clases para ser utilizada en otros ficheros
    container.register({

        // repositorios
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRespository: asClass(MovementMySQLRepository).scoped(),
        balanceRespository: asClass(BalanceMySQLRepository).scoped(),

        //servicios que se van a llamar en controller
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped(), //registro la clase que quiero manipular con container
    
    });

    app.use(scopePerRequest(container));
}