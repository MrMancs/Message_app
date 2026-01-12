import { Pool } from "@neondatabase/serverless";

export default async function Register(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
        const { username, email, password } = req.body;

        pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password]);

        return new Response(JSON.stringify({ message: 'User registered successfully!' }), { status: 201, headers: "Content-Type: application/json" });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error while registering!' }), { status: 500, headers: "Content-Type: application/json" });
    }
}
