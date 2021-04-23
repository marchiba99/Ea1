import { Request, Response } from 'express';
import personas from '../models/personas';
import Cluster from '../models/personas';

class PersonasController {
// Esta función devuelve la lista con todas las diferentes personas
    public async getPersonas(req: Request, res: Response){
        
        try{
            let personasList = await personas.find();
            res.status(200).json(personas);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async getPersona(req: Request, res: Response){
        //Devuelve detalles de una personas en especifico
        try{   
            let PersonaD = await personas.findById(req.params.id);
            if(!personas){
                console.log(`\nNo se ha encontrado esta persona: ${req.params.clusterid} `);
                res.status(404).json(`No se ha encontrado esta persona ${req.params.clusterid} `);
            }
            else
                res.status(200).json(personas);
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`);
        }
    }

    public async addPersona(req: Request, res: Response){
        try{
            let {nombre, apellidos, fechaN, fechaV, profesion, vacuna } = req.body;
            let newPersona = new personas ( {nombre, apellidos, fechaN, fechaV, profesion, vacuna} );
            await newPersona.save();
            console.log(`\nPersona añadida correctamente:\n ${newPersona}`);
            res.status(201).json(newPersona); 
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`); 
        }
    }

    public async editPersonas(req: Request, res: Response){
        try{
            let {nombre, apellidos, fechaN, fechaV, profesion, vacuna} = req.body;
            let checkPersona = await personas.findById(req.params.personaid);
            if(checkPersona){
                await personas.findOneAndUpdate( {'_id':req.params.personaid}, {$set:{"nombre": req.body.nombre, "apellidos": req.body.apellidos}, "fechaN": req.body.fechaN, "fechaV": req.body.fechaV, "profesion": req.body.profesion, "vacuna": req.body.vacuna }, {new: true}).then((updatedPersona) => {
                    console.log(`La persona con la id: ${req.params.personaid} modified: ${updatedPersona}`);
                    res.status(201).json(updatedPersona);
                })
            }
            else{
                console.log(`No se ha encontrado la persona con la siguiente id: ${req.params.personaid} `);
                res.status(404).json(`No se ha encontrado la persona con la siguiente id ${req.params.personaid} `);
            }
        }
        catch(error){
            console.log(`\n` + error);
            res.status(500).json(`${error}`); 
        }
    }

}

const controller: PersonasController = new PersonasController();
export default controller;