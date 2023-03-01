import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SquadTeam = new Schema({
  deporte: {
    type: String,
    require: true,
    index: true,
  },
  idDeporte: {
    type: String,
    require: true,
    index: true,
  },
  categoria: {
    type: String,
    require: true,
  },
  idCategoria: {
    type: String,
    require: true,
  },
  canalCategoria: {
    type: String,
    require: true,
  },
  campeonato: {
    type: String,
    require: true,
  },
  idCampeonato: {
    type: String,
    require: true,
  },
  campeonatoNombreAlternativo: {
    type: String,
    require: true,
  },
  idCampeonatoNombreAlternativo: {
    type: String,
    require: true,
  },
  fechaActual: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Squad_Team", SquadTeam);
