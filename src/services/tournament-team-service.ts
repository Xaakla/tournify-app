import { SQLError } from "expo-sqlite";
import { DatabaseConnection } from "../database/connection";
import { TournamentTeamInterface } from "../interfaces";

const db = DatabaseConnection.getConnection();
const table = "standings";

export default class TournamentTeamService {
  static findTeamsByTournament(tournamentId: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT teams.name, teams.color, teams.uri, standings.* FROM ${table}
                    INNER JOIN teams ON standings.team_id = teams.id
                    WHERE tournament_id = ? ORDER BY
                        points DESC,
                        victories DESC,
                        losses ASC,
                        draws ASC,
                        goals_difference DESC,
                        goals_for DESC,
                        goals_against ASC;`,
            [tournamentId],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => reject(txError)
      )
    );
  }

  static findStandingById(standingId: number) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT teams.name, teams.color, teams.uri, standings.* FROM ${table}
                    INNER JOIN teams ON standings.team_id = teams.id
                    WHERE id = ?;`,
            [standingId],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => reject(txError)
      )
    );
  }

  static saveStandings(team: TournamentTeamInterface) {
    let query: string = `UPDATE ${table} SET
            points = ${team.points},
            victories = ${team.victories},
            losses = ${team.losses},
            draws = ${team.draws},
            goals_difference = ${team.goals_difference},
            goals_for = ${team.goals_for},
            goals_against = ${team.goals_against},
            matches_played = ${team.matches_played},
            ultilization_rate = ${team.ultilization_rate}
            WHERE id = ${team.id};`;

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
        (txError) => reject(txError)
      )
    );
  }

  static findTournamentsByTeamId(id: string) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM standings WHERE team_id = ?`,
            [id],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError: SQLError) => {
              reject(sqlError);
            };
        },
        (txError) => reject(txError)
      )
    );
  }

  // static updateById(id: number) {
  //     return new Promise((resolve, reject) => db.transaction(tx => {
  //             tx.executeSql(`update ${table} set name = ?, color = ? where id = ?;`, [team.name,team.color,team.id], () => {
  //                 resolve('atualizado')
  //             }), (sqlError: SQLError) => {
  //                 reject(sqlError);
  //             }}, (txError) => {
  //                 reject(txError);

  //         }));
  // }
}
