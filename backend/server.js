import express from "express"
import cors from "cors"
import mysql from "mysql"

const app = express()
const PORT = 3000
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "events"
})

db.connect((err) => {
    if (err) {
        console.log("Erreur de connexion à la BDD:\n", err)
    } else {
        console.log("Connecté !")
    }
})

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/data", (req, res) => {
    const sql = "SELECT * FROM event"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error"
              })
        }
        return res.json(result)
    })
})

app.listen(PORT, () => {
    console.log(`Serveur up sur: http://localhost:${PORT}`)
})