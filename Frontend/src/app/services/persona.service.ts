import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Personas } from '../models/personas'

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  serverIP:string = "localhost";
  serverPort:number = 3000;

  personasRouter:string = `http://${this.serverIP}:${this.serverPort}/personas`;

  constructor(
    private http: HttpClient
  ) { }
  
  getPersonas(){
    const path = `${this.personasRouter}/`;
    return this.http.get<Personas[]>(path);
  }

  getPersona(personaid:string){
    const path = `${this.personasRouter}/${personaid}`;
    return this.http.get<Personas>(path);
  }

  addPersona(newPersona:Personas){
    const path = `${this.personasRouter}/new`;
    return this.http.post(path, newPersona);
  }

  editPersona(personaid:string, personasmodify:Personas){
    const path = `${this.personasRouter}/${personaid}`;
    return this.http.put(path, personasmodify);
  }

}
