import { Pool } from "@neondatabase/serverless";

export default async function Search(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { search } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username ILIKE $1",
      [`%${search}%`]
    );

    return res.json({ users: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "Error while searching" });
  }
}
