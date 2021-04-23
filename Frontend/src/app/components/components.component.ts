import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Personas } from '../models/personas';
import { PersonasService } from '../services/persona.service';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  personasList: Personas[] = []; //Hacer lista Personas
   //Hacer lista Personas
  selectedPersonas: Personas = new Personas; //Guarda la persona seleccionada
 //Guarda la persona seleccionada

  //Atributos
  visibleSelectedPersonas = false;

  addPersonasForm = new FormGroup({
    personasNameInput: new FormControl('', [Validators.required, Validators.min(0)]),
    personasApellidosInput: new FormControl('', [Validators.required, Validators.min(4)]),
    personasFechaNInput: new FormControl('', [Validators.required, Validators.min(4)]),
    personasFechaVInput: new FormControl('', [Validators.required, Validators.min(4)]),
    personasProfesionInput: new FormControl('', [Validators.required, Validators.min(4)]),
    personasVacunaInput: new FormControl('', [Validators.required, Validators.min(4)]),
  });

  constructor(
    private personasService: PersonasService
  ) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  public getPersonas(){
    this.personasList = [];               //pone que la lista este vacia para que no hayn duplicados
    this.selectedPersonas = new Personas(); //Resetea la seleccion

    this.personasService.getPersonas()
    .subscribe(res => {
      this.personasList = res as Personas[];
      console.log(res);
    });
  }

  public getPersona(i:number){
    this.visibleSelectedPersonas = false;

    let selectedClusterId = this.personasList[i]._id;

    this.personasService.getPersona(selectedClusterId)
      .subscribe(res => {
        this.selectedPersonas = res as Personas;
      });

    this.visibleSelectedPersonas = true;
  }

  public addPersonas(){
    let newPersona = new Personas();
    newPersona.nombre = this.addPersonasForm.get('PersonaNombreInput').value;
    newPersona.apellidos = this.addPersonasForm.get('PersonaApellidosInput').value;
    newPersona.fechaN = this.addPersonasForm.get('PersonaFechaNInput').value;
    newPersona.fechaV = this.addPersonasForm.get('PersonaFechaVInput').value;
    newPersona.profesion = this.addPersonasForm.get('PersonaProfesionInput').value;
    newPersona.vacuna = this.addPersonasForm.get('PersonaVacunaInput').value;
    
    this.personasService.addPersona(newPersona)
    .subscribe(res => {
      let addedpersonas = res as Personas;
      if(addedpersonas.nombre == newPersona.nombre && 
        addedpersonas.apellidos == newPersona.apellidos &&
        addedpersonas.fechaN == newPersona.fechaN &&
        addedpersonas.fechaV == newPersona.fechaV &&
        addedpersonas.profesion == newPersona.profesion &&
        addedpersonas.vacuna == newPersona.vacuna) 
        alert(`La persona:  ${addedpersonas.nombre} ha sido creada satisfactoriamente`);
      else
        alert(`No se ha creado la persona`);
    });
  }

  public editPersona(){
    this.personasService.editPersona(this.selectedPersonas._id, this.selectedPersonas)
    .subscribe(res => {
      let editedpersona = res as Personas;
      if(editedpersona.nombre == this.editPersonaForm.get('personaNameEdit').value &&
      editedpersona.apellidos == this.editPersonaForm.get('personaApellidosEdit').value &&
      editedpersona.fechaN== this.editPersonaForm.get('personafechaNEdit').value &&
      editedpersona.fechaV == this.editPersonaForm.get('personaFechaVEdit').value &&
      editedpersona.profesion == this.editPersonaForm.get('personaprofesionEdit').value &&
      editedpersona.vacuna == this.editPersonaForm.get('personavacunaEdit').value)
      
      
        alert(`La persona :  ${editedpersona.nombre} ha sido editada correctamente`);
      else
        alert(`No se ha podido editar`);
    });
  }

}

