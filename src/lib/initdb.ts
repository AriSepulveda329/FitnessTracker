import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || ""),
});

db.connect();

db.query(
  `CREATE TABLE IF NOT EXISTS users (
	ID serial NOT NULL PRIMARY KEY,
	name text NOT NULL,
	email text NOT NULL UNIQUE,
	height smallint NOT NULL CHECK (height >= 4 AND height <= 280),
	hFormat char(2) CHECK (hFormat = 'cm' OR hFormat = 'ft') DEFAULT 'cm',
	wheight smallint NOT NULL CHECK (wheight >= 20 AND wheight <= 1100),
	wFormat char(2) CHECK (wFormat = 'kg' OR wFormat = 'lb') DEFAULT 'kg'
);`,
  (error, res) => {
    if (error) console.log(error);
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS sessions (
    id text NOT NULL PRIMARY KEY UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`,
  (error, res) => {
    if (error) console.log(error);
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS activities (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	activities_name varchar(40) NOT NULL,
	activity_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	calories int,
	FOREIGN KEY (user_id) REFERENCES users(id)
);`,
  (error, res) => {
    if (error) console.log(error);
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS exercises (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	name varchar(40) NOT NULL,
	exercise_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	duration varchar(40) NOT NULL,
	calories int NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id)
);`,
  (error, res) => {
    if (error) console.log(error);
  }
);

export default db;
