import { Pool } from "@neondatabase/serverless";

export default async function sendMessage(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { sender, receiver, message, sentAt } = req.body;
    console.log("Küldéshez szükséges adatok:", sender, receiver, message, sentAt);

    const result = await pool.query(
      "INSERT INTO messages (sender, receiver, message, created_at) VALUES ($1, $2, $3, $4)",
      [sender, receiver, message, sentAt]
    );

    console.log(result)

    return res.status(200).json({ message: "Message sent!", status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while sending message" });
  }
}
