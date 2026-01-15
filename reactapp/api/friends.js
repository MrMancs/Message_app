import { Pool } from "@neondatabase/serverless";

export default async function Friends(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { requesterName, receiverName } = req.body;

    const result = await pool.query(
      "SELECT * FROM friendships WHERE receiver_name = $1 AND requester_name = $2 AND status = 'accepted'",
      [receiverName, requesterName]
    );

    return res.status(200).json({ friends: result.rows[0].requester_name });
  } catch (error) { 
    return res.status(500).json({ message: "Error while fetching friends" });
  }
}
