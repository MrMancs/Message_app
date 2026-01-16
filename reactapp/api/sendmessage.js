import { Pool } from "@neondatabase/serverless";

export default async function sendMessage(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { sender, receiver, message } = req.body;

    const result = await pool.query(
      "INSERT INTO messages (sender, receiver, message) VALUES ($1, $2, $3)",
      [sender, receiver, message]
    );

    console.log(result)

    return res.status(200).json({ message: "Message sent!", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: "Error while sending message" });
  }
}
