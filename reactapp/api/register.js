import { Pool } from "@neondatabase/serverless";

export default async function Register(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const { username, email, password } = req.body;

  pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password]
  );

  const result = await pool.query("SELECT * FROM users");
  console.log(result);
}
