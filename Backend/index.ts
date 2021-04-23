  
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Request, Response } from 'express';

import Router from './routes/index';            //Importamos el fichero de routes que tenemos guardado en index.ts
import './database';                            //Conexion a mongoDB


//INIZIALICACIÓN
const app: express.Application = express();     //Creación de aplicación express
const serverport: number = 3000;                //Port 3000 como servidor


//CONFIGURACIÓN I MIDDLEWARES
app.set('port', serverport);

app.use(express.json());                        //Interpretar ficheros JSON
app.use(express.urlencoded({'extended': false})); //Interpretar ficheros html
app.use(morgan('dev'));                         //printa en consola  HTTP requests
app.use(cors());                                //Para usar CORS in HTTP


//ROUTES
app.get('/test', (req: Request, res: Response) => {
    res.send(`Hello World! I'm listening at port ${app.get('port')}`);
});

app.use('', Router);                            //Usamos las routes que hemos definido en index.ts


//SERVER START
app.listen(app.get('port'), () => {
    console.log(`\nServer listening at port ${app.get('port')}`);
});