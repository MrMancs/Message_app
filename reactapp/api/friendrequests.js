import { Pool } from "@neondatabase/serverless";

export default async function FriendRequests(req, res) {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const { currentUser } = req.body;

    const result = await pool.query(
      "SELECT * FROM friendships WHERE receiver_name = $1 AND status = 'pending'",
      [currentUser]
    );

    console.log(result);

    console.log(result.rows.requester_name);

    return res.status(200).json({ requester: result.rows.requester_name });
  } catch (error) {
    return res.status(500).json({ message: "Error while browsing friend requests" });
  }
}
