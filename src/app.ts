//Configuracion de variables de entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
process.env.APP_ENV = process.env.APP_ENV || 'development'; // que asigne segun el ambiente en el que este actualmente la variable APP_ENV
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env` //segun el APP_ENV va a cargar el archivo correspondiente
});
console.log(process.env.APP_FOO);

import express from "express"; //manera de importar con typescript
import {loadControllers} from 'awilix-express';
import Container from './container'; //configuracion entre container y express

const app: express.Application = express(); //definimos el tipado de la constante app

//JSON Support: configuramos express para que trabaje con datos json
app.use(express.json());

//fusionamos container(contenedor de clases) y express
Container(app);

//fusionamos controllers de wilix con express, para que express tome en cuenta que controller de wilix va a hacer el enrutamiento
app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));

export {app};

