import { SQLError } from "expo-sqlite";
import { DatabaseConnection } from "../database/connection";
import { TeamInterface } from "../interfaces";

const db = DatabaseConnection.getConnection();
const table = "teams";

export default class TeamService {
  static addData(param: TeamInterface) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO ${table} (id, name, color, uri, rating)
                VALUES (?,?,?,?,?)`,
            [param.id, param.name, param.color, param.uri, param.rating],
            (_, { insertId, rows }) => {
              console.log("id insert: " + insertId);
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

  static deleteById(id: string) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `DELETE FROM ${table} WHERE id = ?`,
            [id],
            (_, { rows }) => {
              resolve("deletado");
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

  static updateById(team: TeamInterface) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE ${table} SET name = ?, color = ?, uri = ?, rating = ? where id = ?;`,
            [team.name, team.color, team.uri, team.rating, team.id],
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

  static findById(id: string) {
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
          reject(txError);
        }
      )
    );
  }

  static searchTeams(name: string) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${table} WHERE name LIKE '%${name}%'`,
            [],
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

  static findAllByIds(ids: string[]) {
    let query = `SELECT * FROM ${table} WHERE id IN (`;
    ids.forEach((id: string, index) => {
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

  static insertTeamsInTournament(tournamentId: number, teamIds: string[]) {
    let query = "INSERT INTO standings (team_id, tournament_id) VALUES";
    teamIds.forEach((id, index) => {
      query = query.concat(`('${id}', ${tournamentId})`);
      if (index === teamIds.length - 1) query = query.concat(";");
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
}
