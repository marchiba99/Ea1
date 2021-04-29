import { Schema, model, Document } from 'mongoose';

const PersonasL = new Schema({
  nombre: {type: String, required: true},
  apellidos: {type: String, required: true},
  fechaN: {type: Date, default: Date.now},
  fechaV: {type: Date, default: Date.now},
  profesion: {type: String, required: true},
  vacuna: {type: String,required: true},
});


interface IPersonasL extends Document {
  nombre: string,
  apellidos: string,
  fechaN: Date,
  fechaV: Date,
  profesion: string,
  vacuna  : string,

};

export default model<IPersonasL>('PersonasL',PersonasL);
