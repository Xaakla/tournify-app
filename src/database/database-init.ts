import { DatabaseConnection } from "./connection";

const db = DatabaseConnection.getConnection();

export default function DatabaseInit() {
  db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () => {
      console.log("Foreign keys turned on")
      InitDb();
    }
  );

  function InitDb() {
    var sql = [
      `DROP TABLE IF EXISTS matches;`,
      `DROP TABLE IF EXISTS rounds;`,
      `DROP TABLE IF EXISTS standings;`,
      `DROP TABLE IF EXISTS tournaments;`,
      `DROP TABLE IF EXISTS teams;`,
      `CREATE TABLE IF NOT EXISTS teams (
                id varchar(255) NOT NULL PRIMARY KEY,
                name varchar(255) NOT NULL,
                color varchar(255) NOT NULL,
                uri varchar(510) NOT NULL,
                rating INTEGER NOT NULL
            );`,
      `CREATE TABLE IF NOT EXISTS tournaments (
                id INTEGER NOT NULL PRIMARY KEY autoincrement,
                name varchar(255) NOT NULL,
                teams_quantity INTEGER NOT NULL,
                rounds_quantity INTEGER NOT NULL,
                trip varchar(255) NOT NULL,
                mode varchar(255) NOT NULL,
                victory_points INTEGER NOT NULL,
                draw_points INTEGER NOT NULL,
                lose_points INTEGER NOT NULL,
                standings_zone varchar(1000),
                phase varchar(255),
                uri varchar(510)
            );`,
      `CREATE TABLE IF NOT EXISTS standings (
                id INTEGER NOT NULL PRIMARY KEY autoincrement,
                tournament_id INTEGER NOT NULL,
                team_id varchar(255) NOT NULL,
                points INTEGER NOT NULL DEFAULT 0,
                goals_for INTEGER NOT NULL DEFAULT 0,
                goals_against INTEGER NOT NULL DEFAULT 0,
                goals_difference INTEGER NOT NULL DEFAULT 0,
                victories INTEGER NOT NULL DEFAULT 0,
                losses INTEGER NOT NULL DEFAULT 0,
                draws INTEGER NOT NULL DEFAULT 0,
                ultilization_rate INTEGER NOT NULL DEFAULT 100,
                matches_played INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
                FOREIGN KEY (team_id) REFERENCES teams (id)
            );`,
      `CREATE TABLE IF NOT EXISTS rounds (
                id INTEGER NOT NULL PRIMARY KEY autoincrement,
                tournament_id INTEGER NOT NULL,
                FOREIGN KEY (tournament_id) REFERENCES tournaments (id)
            );`,
      `CREATE TABLE IF NOT EXISTS matches (
                id INTEGER NOT NULL PRIMARY KEY autoincrement,
                round_id INTEGER NOT NULL,
                home_team_id varchar(255) NOT NULL,
                home_team_goals INTEGER NOT NULL DEFAULT 0,
                away_team_id varchar(255) NOT NULL,
                away_team_goals INTEGER NOT NULL DEFAULT 0,
                status varchar(255) NOT NULL DEFAULT "start",
                FOREIGN KEY (round_id) REFERENCES rounds (id),
                FOREIGN KEY (home_team_id) REFERENCES teams (id),
                FOREIGN KEY (away_team_id) REFERENCES teams (id)
            );`
    ];

    db.transaction(
      (tx) => {
        for (let i = 0; i < sql.length; i++) {
          console.log("execute sql : " + sql[i]);
          tx.executeSql(sql[i]);
        }
      },
      (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
      },
      () => {
        console.log("transaction complete call back ");
      }
    );
  }
}


