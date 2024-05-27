import { SQLError } from "expo-sqlite";
import { DatabaseConnection } from "../database/connection";
import generateMatches from "./generate-matches";

const db = DatabaseConnection.getConnection();
const table = "tournaments";
const relationshipTable = "standings";

import TeamService from "../services/team-service";
import DatabaseInit from "../database/database-init";
import {INewTournament} from "../interfaces/new-tournament.interface";
import {IMatch} from "../interfaces/match-interface";

export default class TournamentService {
  static async create(tournament: INewTournament) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO ${table} (name, teams_quantity, rounds_quantity, trip, mode, victory_points, draw_points, lose_points, standings_zone, uri)
                    VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
              tournament.name,
              tournament.teamsQuantity,
              tournament.roundsQuantity,
              tournament.trip,
              tournament.mode,
              tournament.victoryPoints,
              tournament.drawPoints,
              tournament.losePoints,
              JSON.stringify(tournament.standingsZone),
              tournament.uri,
            ],
            (_, { insertId, rows }) => {
              const generatedTournament = generateMatches(
                tournament.teams,
                tournament.roundsQuantity,
                tournament.trip,
                tournament.teamsQuantity
              );
              // console.log("GENERATED TOURNAMENT", generatedTournament);

              TeamService.insertTeamsInTournament(insertId, tournament.teamsIds)
                .then((response: any) => {
                  console.log("relationship", response);

                  generatedTournament.forEach((round, index) => {
                    this.addRound(insertId)
                      .then((response: any) => {
                        console.log(response);

                        round.matches.forEach((match) => {
                          this.addMatches(response, match)
                            .then((response) => {
                              console.log(response);
                            })
                            .catch((err) =>
                              console.error("Error trying save match", err)
                            );
                        });
                      })
                      .catch((err) =>
                        console.error("Error trying save round", err)
                      );

                    if (index + 1 === generatedTournament.length)
                      return resolve({ insertId, tournament });
                  });
                })
                .catch((err) =>
                  console.error("Error trying make relationship", err)
                );
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static findAll() {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
            resolve(rows);
          }),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          console.log('Database does not exists. Creating new...');
          DatabaseInit();
        }
      )
    );
  }

  static findTournamentById(id: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static findTournamentsByIds(ids: number[]) {
    let query = `SELECT * FROM ${table} WHERE id IN (`;
    ids.forEach((id: number, index) => {
      query = query.concat(`'${id}'`);
      if (index === ids.length - 1) query = query.concat(");");
      else query = query.concat(", ");
    });

    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(query, [], (_, { rows }) => {
            resolve(rows);
          }),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  // static updateMatch(tournamentId: number, matches: string) {
  //     return new Promise((resolve, reject) => db.transaction(tx => {
  //         tx.executeSql(`update ${table} set matches = ? where id = ?;`, [matches,tournamentId], () => {
  //             resolve('atualizado')
  //         }), (sqlError: SQLError) => {
  //             reject(sqlError);
  //         }}, (txError) => {
  //             reject(txError);

  //     }));
  // }

  static deleteTournament(tournamentId: number) {
    console.log(tournamentId);
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM ${table} WHERE id = ?;`,
            [tournamentId],
            (_, { rows }) => {
              resolve("deletado");
            }
          ),
            (sqlError: SQLError) => {
              console.error(sqlError);
            };
        },
        (txError) => {
          console.error(txError);
        }
      )
    );
  }

  static addRound(tournamentId: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO rounds (tournament_id)
                VALUES (?)`,
            [tournamentId],
            (_, { insertId, rows }) => {
              console.log("round added: " + insertId);
              resolve(insertId);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static findAllRounds(tournamentId: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM rounds WHERE tournament_id = ?;`,
            [tournamentId],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static addMatches(roundId: number, match: IMatch) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO matches
                (round_id, home_team_id, home_team_goals,
                    away_team_id, away_team_goals)
                VALUES (?,?,?,?,?)`,
            [
              roundId,
              match.home_team_id,
              match.home_team_goals,
              match.away_team_id,
              match.away_team_goals,
            ],
            (_, { insertId, rows }) => {
              console.log("match added: " + insertId);
              resolve(insertId);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static findAllMatches(roundIds: number[]) {
    // console.log('roundIds: ', roundIds);
    let query = `SELECT home.name AS home_team_name, home.color AS home_team_color, home.uri AS home_team_uri,
            home.rating AS home_team_rating,
            away.name AS away_team_name, away.color AS away_team_color, away.uri AS away_team_uri,
            away.rating AS away_team_rating,
            match.*, home_standings.ultilization_rate AS home_ultilization_rate,
            away_standings.ultilization_rate AS away_ultilization_rate
            FROM standings home_standings, standings away_standings, teams home, teams away, matches match
                WHERE match.round_id IN (`;

    roundIds.forEach((id: number, index) => {
      query = query.concat(`${id}`);
      if (index === roundIds.length - 1)
        query = query.concat(`)
                AND match.home_team_id = home.id
                AND match.away_team_id = away.id
                AND home_standings.tournament_id =
                    (SELECT rounds.tournament_id FROM rounds
                        WHERE rounds.id = ${id}
                        AND home_standings.team_id = home.id)
                AND away_standings.tournament_id =
                (SELECT rounds.tournament_id FROM rounds
                    WHERE rounds.id = ${id}
                    AND away_standings.team_id = away.id);`);
      else query = query.concat(", ");
    });

    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(query, [], (_, { rows }) => {
            resolve(rows);
          }),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static findMatchById(matchId: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM matches WHERE id = ?",
            [matchId],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }

  static updateMatch(match: IMatch) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE matches SET
                            home_team_id = ?,
                            home_team_goals = ?,
                            away_team_id = ?,
                            away_team_goals = ?,
                            status = ?
                            WHERE id = ?;`,
            [
              match.home_team_id,
              match.home_team_goals,
              match.away_team_id,
              match.away_team_goals,
              match.status,
              match.id,
            ],
            () => {
              resolve("atualizado");
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => {
          reject(txError);
        }
      )
    );
  }
}
