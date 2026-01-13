import { Pool } from "@neondatabase/serverless";

export default async function Login(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { email, password } = req.body;

    await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);

    return res.status(200).json({ message: "Login Successful!" });
  } catch (error) {
    return res.status(500).json({ message: "Error while logging in!" });
  }
}
