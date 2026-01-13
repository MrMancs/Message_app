import { Pool } from "@neondatabase/serverless";

export default async function Search(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { search } = req.body;

    const result = await pool.query("SELECT * FROM users")

    return (res.status(200).json({ users: result, search,}))

    /*
    if(result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid user" });
    } else {
        return res.status(200).json({ message: "User found" });
    }*/

  } catch (error) {
    return res.status(500).json({ message: "Error while searching" });
  }
}