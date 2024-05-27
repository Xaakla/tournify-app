CREATE TABLE IF NOT EXISTS teams (
	id INT NOT NULL PRIMARY KEY,
	name varchar(255) NOT NULL,
	color varchar(255)
);

CREATE TABLE IF NOT EXISTS tournaments (
	id INT NOT NULL PRIMARY KEY autoincrement,
	name varchar(255) NOT NULL,
	teams_quantity INT NOT NULL,
	rounds_quantity INT NOT NULL,
	trip varchar(255) NOT NULL,
	mode varchar(255) NOT NULL,
	phase varchar(255),
);

CREATE TABLE IF NOT EXISTS rounds (
	id INT NOT NULL PRIMARY KEY autoincrement,
	tournament_id INT NOT NULL,
	group_id INT,
);

CREATE TABLE IF NOT EXISTS tournament_groups (
	id INT NOT NULL PRIMARY KEY autoincrement,
	tournament_id INT NOT NULL,
	FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
);

CREATE TABLE IF NOT EXISTS knockouts (
	id INT NOT NULL PRIMARY KEY autoincrement,
	tournament_id INT NOT NULL,
	steps INT NOT NULL,
	FOREIGN KEY (tournament_id) REFERENCES tournaments (id),
);

CREATE TABLE IF NOT EXIST matches (
	id INT NOT NULL PRIMARY KEY autoincrement,
	round_or_knockout_id INT,
	home_team_id INT,
	away_team_id INT,
	winner_id INT,
	loser_id INT,
	knockout_step INT,
	FOREIGN KEY (winner_id) REFERENCES teams (id),
	FOREIGN KEY (loser_id) REFERENCES teams (id)
	FOREIGN KEY (home_team_id) REFERENCES teams (id),
	FOREIGN KEY (away_team_id) REFERENCES teams (id),
);

CREATE TABLE IF NOT EXISTS standings (
	id INT NOT NULL PRIMARY KEY autoincrement,
	team_id INT NOT NULL,
	tournament_id INT NOT NULL,
	goals_for INT NOT NULL DEFAULT 0,
	goals_against INT NOT NULL DEFAULT 0,
	goals_difference INT NOT NULL DEFAULT 0,
	points INT NOT NULL DEFAULT 0,
	victories INT NOT NULL DEFAULT 0,
	losses INT NOT NULL DEFAULT 0,
	draws INT NOT NULL DEFAULT 0,
	matches_played INT NOT NULL DEFAULT 0,
	FOREIGN KEY (team_id) REFERENCES teams (id),
);

-- BUSCAR TODOS OS TIMES DENTRO DE UM TORNEIO
SELECT * FROM teams WHERE id IN (SELECT team_id FROM rl_tournament_teams WHERE tournament_id = ?)

-- BUSCAR TODOS OS TORNEIOS QUE UM TIME PARTICIPA
SELECT * FROM tournaments WHERE id IN (SELECT tournament_id FROM rl_tournament_teams WHERE team_id = ?)

-- BUSCAR DADOS DOS TIMES EM UM TORNEIO ORDENANDO
SELECT * FROM rl_tournament_teams WHERE tournament_id = ? ORDER BY
	points DESC,
	victories DESC,
	losses ASC,
	draws ASC,
	goals_difference DESC,
	goals_for DESC,
	goals_against ASC;

-- INSERIR VARIOS TIMES EM UM TORNEIO
INSERT INTO rl_tournament_teams (team_id, tournament_id) VALUES
	(?, ?),
	(?, ?);

-- BUSCAR TODAS AS RODADAS DE UM TORNEIO
SELECT * FROM rounds WHERE tournament_id = ?;

-- BUSCAR TODAS AS PARTIDAS EM UMA RODADA OU EM UM MATA MATA
SELECT * FROM matches WHERE round_or_knockout_id = ?;

-- BUSCAR TODAS AS PARTIDAS DE UM TORNEIO
SELECT * FROM matches WHERE round_or_knockout_id IN (SELECT * FROM rounds WHERE tournament_id = ?);

-- BUSCAR VENCEDOR DO MATA MATA
SELECT TOP 1 FROM teams WHERE id = ( SELECT winner_id FROM matches WHERE round_or_knockout_id = ? AND knockout_step = 1 LIMIT 1);

-- BUSCAR VENCEDOR DE TORNEIO DE FASES (GRUPO E MATA MATA) PELO ID DO TORNEIO
SELECT TOP 1 FROM teams WHERE id =
	( SELECT winner_id FROM matches WHERE knockout_step = 1 AND
	 	round_or_knockout_id = (SELECT id FROM knockouts WHERE tournament_id = ? LIMIT 1)
	 LIMIT 1);
