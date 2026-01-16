import { Pool } from "@neondatabase/serverless";

export default async function acceptFriendRequest(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { status, receiverName, requesterName } = req.body;

    console.log("első lépés")

    const result = await pool.query(
      "UPDATE friendships SET status = $1 WHERE (receiver_name = $2 AND requester_name = $3 AND status = 'pending')",
      [status, receiverName, requesterName]
    );

    console.log(result);

    return res.status(200).json({ message: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while accepting friend request" });
  }
}
