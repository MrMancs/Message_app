import { Pool } from "@neondatabase/serverless";

export default async function acceptFriendRequest(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { status, receiverName } = req.body;

    const result = await pool.query(
      "ALTER TABLE friendships SET status = $1 WHERE receiver_name = $2 AND status = 'pending'",
      [status, receiverName]
    );

    console.log(result);

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    return res.status(500).json({ message: "Error while accepting friend request" });
  }
}
