import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Team = new Schema({
  idEquipo: {
    type: String,
    require: true,
    index: true,
  },
  idPlantelEquipo: {
    type: String,
    require: true,
    index: true,
  },
  nombre: {
    type: String,
    require: true,
  },
  siglas: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Team", Team);
