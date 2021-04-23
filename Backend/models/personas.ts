import { Schema, model } from 'mongoose';

const PersonasL = new Schema({
  nombre: {type: String, required: true},
  apellidos: {type: String, required: true},
  fechaN: {type: Date, default: Date.now},
  fechaV: {type: Date, default: Date.now},
  profesion: {type: String, required: true},
  vacuna: {type: String,required: true},
});

export default model('PersonasL', PersonasL);