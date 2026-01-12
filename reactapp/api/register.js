import { Pool } from "@neondatabase/serverless";

export default async function Register(req, res) {
    var pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    
    const data = await req.body.json();

    pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [data.username, data.email, data.password])

    const result = await pool.query("SELECT * FROM users")
    console.log(result)
}
