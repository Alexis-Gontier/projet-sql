import mysql from 'mysql';

// config bdd
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "theatre_db"
});

//  verifconnexion
db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la BDD :", err);
    } else {
        console.log("Connexion à la base de données réussie !");
    }
});

export default db;