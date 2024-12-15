import mysql from 'mysql';

// Configuration de la base de données
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "theatre_db"
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la BDD :", err);
    } else {
        console.log("Connexion à la base de données réussie !");
    }
});

export default db;