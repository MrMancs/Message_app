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

    console.log(result)
    console.log(result.rows[0])

    return res.status(200).json({ reqName: result.rows[0].requester_name });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ error: error });
  }
}
