import { Pool } from "@neondatabase/serverless";

export default async function Register(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
        const { username, email, password } = req.body;

        pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password]);

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}
