import initDatabase from "../src/database.js";
import getData from "./getData.js";
import TeamSchema from "./models/team.js";
import PlayerSchema from "./models/player.js";
import SquadScherma from "./models/squadTeam.js";

const ARRAY_TEAMS = [];
const ARRAY_PLAYERS = [];
let SQUAT_TEAM;

const scriptDataBase = async () => {
  try {
    await initDatabase();

    const data = await getData();

    createBuilderData(data);

    await insertDataCollecion(ARRAY_PLAYERS, ARRAY_TEAMS, SQUAT_TEAM);
  } catch (error) {
    console.log("Error in the execution of the script:" + error.message);
  }
};

scriptDataBase();

const createBuilderData = (data) => {
  builderSquadTeam(data.plantelEquipo);

  const teams = data.plantelEquipo.equipo;
  teams.forEach((team) => {
    builderTeam(team);

    const playersOff = team.jugadoresDadosBaja.jugador;
    const playersActive = team.jugadores.jugador;

    playersActive.forEach((player) => {
      builderPlayer(player, team.id);
    });

    if (playersOff) {
      const playerIsOff = true;

      if (Array.isArray(playersOff)) {
        playersOff.forEach((player) => {
          builderPlayer(player, team.id, playerIsOff);
        });
      } else {
        builderPlayer(playersOff, team.id, playerIsOff);
      }
    }
  });
};

const builderSquadTeam = (data) => {
  SQUAT_TEAM = {
    deporte: data.deporte._,
    idDeporte: data.deporte.id,
    categoria: data.categoria._,
    idCategoria: data.categoria.id,
    canalCategoria: data.categoria.canal,
    campeonato: data.campeonato._,
    idCampeonato: data.campeonato.id,
    campeonatoNombreAlternativo: data.campeonatoNombreAlternativo._,
    idCampeonatoNombreAlternativo: data.campeonatoNombreAlternativo.id,
    fechaActual: parseDate(data.fechaActual),
  };
};

const builderTeam = (team) => {
  ARRAY_TEAMS.push({
    plantelEquipo: "12345",
    idEquipo: team.id,
    nombre: team.nombre,
    siglas: team.sigla,
    paisId: team.paisId,
    paisNombre: team.paisNombre,
    tipo: team.tipo,
    jugadoresCantidad: team.jugadores.cant,
    jugadoresDadosBajaCantidad: team.jugadoresDadosBaja.cant,
  });
};

const builderPlayer = (player, teamId, playerOff = false) => {
  const playerInfo = {
    idJugador: player.id,
    idEquipo: teamId,
    nombre: player.nombre,
    apellido: player.apellido,
    nombreCorto: player.nombreCorto,
    jugadorDadoBaja: playerOff,
    ladoHabil: player.ladoHabil,
    fechaNacimiento: new Date(player.fechaNacimiento),
    horaNacimiento: player.horaNacimiento,
    edad: player.edad,
    peso: player.peso,
    altura: player.altura,
    apodo: player.apodo,
    rol: {
      idRol: player.rol.idRol,
      rolName: player.rol._,
    },
    camiseta: player.camiseta,
    pais: {
      paisId: player.pais.paisId,
      paisName: player.pais._,
    },
    provincia: player.provincia,
    clubActual: {
      id: player.id,
      nombre: player.clubActual.nombre,
      paisId: player.clubActual.paisId,
      paisNombre: player.clubActual.paisNombre,
      paisSigla: player.clubActual.paisSigla,
      tipo: player.clubActual.tipo,
    },
    localidad: player.localidad,
  };

  if (player.fechaBaja) playerInfo.fechaBaja = new Date(player.fechaBaja);

  ARRAY_PLAYERS.push(playerInfo);
};

const insertDataCollecion = async ( ArrayDataPlayer,ArrayDataTeam,dataSquadTeam) => {
  try {
    SquadScherma.collection.insertOne(dataSquadTeam);
    PlayerSchema.collection.insertMany(ArrayDataPlayer);
    TeamSchema.collection.insertMany(ArrayDataTeam);
    console.log("data inserted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const parseDate = (dateString) => {
  let year = dateString.substr(0, 4);
  let month = dateString.substr(4, 2);
  let day = dateString.substr(6, 2);
  let date = new Date(year + "-" + month + "-" + day);
  return date;
};
