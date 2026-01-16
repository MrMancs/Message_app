import { Pool } from "@neondatabase/serverless";

export default async function sendMessage(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { sender, receiver } = req.body;

    const result = await pool.query(
      "SELECT * FROM messages WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1) ORDER BY created_at ASC",
      [sender, receiver]
    );

    console.log(result);

    return res.status(200).json({ message: "Messages fetched!", status: 200, messages: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while fetching messages" });
  }
}
