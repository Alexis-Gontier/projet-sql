// Imports
import express from "express"
import cors from "cors"

// Routes des routes
import userRoutes from './routes/routes.js'

const app = express()
const PORT = process.env.PORT | 3000

// Middleware global
app.use(cors())
app.use(express.json())

// Utilisation des routes
app.use('/api/v1', userRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur up sur: http://localhost:${PORT}`)
})