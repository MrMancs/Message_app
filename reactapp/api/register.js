import { Pool } from "@neondatabase/serverless";

export default async function Register(req, res) {
    var pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    console.log(process.env.DATABASE_URL)

    pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [req.body.username, req.body.email, req.body.password])

    const result = await pool.query("SELECT * FROM users")
    console.log(result)
}
