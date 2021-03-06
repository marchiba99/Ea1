import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import PersonesRouter from './routes/personas.routes';
import './database';                            //Conexion a mongoDB


//INIZIALICACIÓN
//const app: express.Application = express();     //Creación de aplicación express
const app = express();
const serverport: number = 3000;                //Port 3000 como servidor


//CONFIGURACIÓN I MIDDLEWARES
app.set('port', serverport);

app.use(express.json());                        //Interpretar ficheros JSON
app.use(express.urlencoded({'extended': false})); //Interpretar ficheros html
app.use(morgan('dev'));                         //printa en consola  HTTP requests
app.use(cors());                                //Para usar CORS in HTTP


//ROUTES

app.use('/api', PersonesRouter);                            //Usamos las routes que hemos definido en app.ts



export default app;
