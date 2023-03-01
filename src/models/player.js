import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Players = new Schema({
  idPlayer: {
    type: String,
    require: true,
    index: true,
  },
  idTeam: {
    type: String,
    require: true,
    index: true,
  },
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  nombreCorto: {
    type: String,
    require: true,
  },
  jugadorDadoBaja: {
    type: Boolean,
    require: true,
  },
  fechaBaja: {
    type: Date,
    requiere: false,
  },
  ladoHabil: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
    require: true,
  },
  horaNacimiento: {
    type: String,
  },
  edad: {
    type: Number,
    require: true,
  },
  peso: {
    type: Number,
    require: true,
  },
  altura: {
    type: Number,
    require: true,
  },
  apodo: {
    type: String,
  },
  rol: {
    idRol: { type: String },
    rolName: { type: String, require: true, index: true },
  },
  camiseta: {
    type: Number,
    require: true,
  },
  pais: {
    paisId: { type: String },
    paisName: { type: String },
  },
  provincia: {
    type: String,
  },
  clubActual: {
    id: { type: String },
    nombre: { type: String },
    paisId: { type: String },
    paisNombre: { type: String },
    paisSigla: { type: String },
    tipo: { type: String },
  },
  localidad: {
    type: String,
  },
});

export default mongoose.model("player", Players);
