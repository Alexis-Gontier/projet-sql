/** GET */
/**
 * @swagger
 * /api/v1/theatres:
 *   get:
 *     summary: Récupérer la liste des théâtres
 *     description: Retourne la liste des théâtres
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name: 
 *                     type: string
 *                   presentation:
 *                     type: string
 *                   address:
 *                     type: string
 *                   borough:
 *                     type: integer
*/
/**
 * @swagger
 * /api/v1/spectacle/{id}:
 *   get:
 *     summary: Récupérer les détails d'un spectacle
 *     description: Retourne les détails d'un spectacle spécifique en fonction de son ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: L'ID du spectacle à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès - Détails du spectacle récupérés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spectacle_title:
 *                   type: string
 *                 synopsis:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 price:
 *                   type: number
 *                   format: float
 *                 language:
 *                   type: string
 *                 category_name:
 *                   type: string
 *                 cast_details:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Spectacle non trouvé
 *       500:
 *         description: Erreur serveur
*/

/**
 * @swagger
 * /api/v1/spectacles/{borough}:
 *   get:
 *     summary: Afficher les spectacles par arrondissement
 *     description: Retourne les spectacles qui se déroulent dans un arrondissement spécifique
 *     parameters:
 *       - name: borough
 *         in: path
 *         description: L'arrondissement dans lequel chercher les spectacles
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès - Liste des spectacles récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   borough:
 *                     type: string
 *       400:
 *         description: Arrondissement invalide
 *       404:
 *         description: Aucun spectacle trouvé pour cet arrondissement
 *       500:
 *         description: Erreur serveur
*/
/**
 * @swagger
 * /api/v1/spectacles-en-cours/{category}:
 *   get:
 *     summary: Afficher les spectacles en cours (par rapport à la date) pour une catégorie donnée
 *     description: Retourne les spectacles qui sont actuellement en cours pour la catégorie spécifiée.
 *     parameters:
 *       - name: category
 *         in: path
 *         description: La catégorie des spectacles à afficher (par exemple, "Comédie", "Drame", "Enfant","Musical")
 *         required: true
 *         schema:
 *           type: string
 *           example: "Comédie"
 *     responses:
 *       200:
 *         description: Liste des spectacles en cours récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Titre du spectacle
 *                   category_name:
 *                     type: string
 *                     description: Nom de la catégorie du spectacle
 *                   first_date:
 *                     type: string
 *                     format: date-time
 *                     description: Date de début de la première représentation
 *                   last_date:
 *                     type: string
 *                     format: date-time
 *                     description: Date de fin de la dernière représentation
 *       400:
 *         description: La catégorie spécifiée est invalide ou manquante.
 *       404:
 *         description: Aucun spectacle en cours trouvé pour la catégorie donnée.
 *       500:
 *         description: Erreur serveur interne.
*/

/**
 * @swagger
 * /api/v1/nb-spectacles:
 *   get:
 *     summary: Afficher le nombre de spectacles par catégorie
 *     description: Retourne le nombre de spectacles pour chaque catégorie.
 *     responses:
 *       200:
 *         description: Nombre de spectacles par catégorie récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_name:
 *                     type: string
 *                     description: Nom de la catégorie
 *                   spectacle_count:
 *                     type: integer
 *                     description: Nombre de spectacles dans cette catégorie
 *       500:
 *         description: Erreur serveur interne lors de la récupération des données.
*/

/**
 * @swagger
 * /api/v1/moyenne-places-reservees:
 *   get:
 *     summary: Afficher le nombre moyen de places réservées
 *     description: Retourne le nombre moyen de places réservées dans les représentations de spectacles.
 *     responses:
 *       200:
 *         description: Nombre moyen de places réservées récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avg_places_reserved:
 *                   type: number
 *                   format: float
 *                   description: Nombre moyen de places réservées
 *       500:
 *         description: Erreur serveur interne lors de la récupération des données.
*/
/**
 * @swagger
 * /api/v1/distribution-reservations:
 *   get:
 *     summary: Afficher la distribution statistique des réservations de places
 *     description: Retourne la distribution des réservations de places, avec le nombre total de personnes ayant réservé un certain nombre de places.
 *     responses:
 *       200:
 *         description: Distribution statistique des réservations récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   booked:
 *                     type: integer
 *                     description: Nombre de places réservées.
 *                   total_people:
 *                     type: integer
 *                     description: Nombre total de personnes ayant réservé ce nombre de places.
 *       500:
 *         description: Erreur serveur interne lors de la récupération des données.
*/

/**
 * @swagger
 * /api/v1/taux-remplissage/{spectacleId}:
 *   get:
 *     tags:
 *       - Problème à régler
 *     summary: Afficher le taux de remplissage des salles pour un spectacle spécifique
 *     description: Retourne le taux de remplissage des salles pour le spectacle spécifié, en pourcentage.
 *     parameters:
 *       - name: spectacleId
 *         in: path
 *         description: L'ID du spectacle.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Taux de remplissage récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   room_name:
 *                     type: string
 *                   fill_rate:
 *                     type: number
 *                     format: float
 *       500:
 *         description: Erreur serveur interne lors de la récupération des données.
*/

/**
 * @swagger
 * /api/v1/artistes-communs/{artist_id}:
 *   get:
 *     summary: Liste des artistes ayant collaboré avec un artiste donné sur au moins deux spectacles différents
 *     description: >
 *       Cette route retourne les artistes ayant collaboré avec l'artiste identifié par `artist_id` 
 *       sur au moins deux spectacles différents.
 *     parameters:
 *       - name: artist_id
 *         in: path
 *         required: true
 *         description: L'ID de l'artiste pour lequel on recherche les collaborations.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Liste des artistes ayant collaboré.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   artist_1:
 *                     type: string
 *                     description: Prénom de l'artiste demandé.
 *                   artist_2:
 *                     type: string
 *                     description: Prénom de l'artiste ayant collaboré.
 *             example:
 *               - artist_1: "Jean"
 *                 artist_2: "Marie"
 *               - artist_1: "Jean"
 *                 artist_2: "Paul"
 *       '400':
 *         description: Requête invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Requête invalide"
 *               error: "artist_id est manquant ou incorrect"
 *       '404':
 *         description: Aucune collaboration trouvée pour cet artiste.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Aucune collaboration trouvée pour l'artiste donné"
 *       '500':
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Erreur de serveur lors de la récupération des données"
 *               error: "Détails de l'erreur"
*/

/**
 * @swagger
 * /api/v1/metteurs-en-scene/{theatre_id}:
 *   get:
 *     summary: "Lister les metteurs en scène travaillant dans un théâtre donné"
 *     description: "Cette route permet de récupérer les metteurs en scène (artistes) ayant travaillé dans un théâtre spécifique."
 *     parameters:
 *       - name: theatre_id
 *         in: path
 *         required: true
 *         description: "Identifiant du théâtre"
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: "Liste des metteurs en scène"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: "Prénom de l'artiste"
 *                   lastName:
 *                     type: string
 *                     description: "Nom de l'artiste"
 *             example:
 *               - firstName: "Jean"
 *                 lastName: "Dupont"
 *               - firstName: "Marie"
 *                 lastName: "Lemoine"
 *       '400':
 *         description: "Erreur de requête (paramètre manquant ou incorrect)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Le paramètre 'theatre_id' est manquant ou invalide."
 *       '500':
 *         description: "Erreur interne du serveur"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Erreur de serveur lors de la récupération des données"
 *               error: "Détail de l'erreur SQL ou autre"
*/

/**
 * @swagger
 * /api/v1/categories-places-reservees:
 *   get:
 *     summary: Affiche les trois catégories avec le plus de places réservées
 *     description: Récupère les trois catégories de spectacles ayant le plus de réservations.
 *     responses:
 *       200:
 *         description: Liste des trois catégories avec le plus de places réservées.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_name:
 *                     type: string
 *                     description: Nom de la catégorie.
 *                     example: Comédie
 *                   total_reserved:
 *                     type: integer
 *                     description: Nombre total de places réservées pour cette catégorie.
 *                     example: 150
 *       500:
 *         description: Erreur du serveur lors de la récupération des données.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: Erreur de serveur lors de la récupération des données.
 *                 error:
 *                   type: string
 *                   description: Description détaillée de l'erreur.
 *                   example: "Erreur SQL: Table non trouvée"
*/
/**
 * @swagger
 * paths:
 *   /api/v1/recommandation/{schedule_id}:
 *     get:
 *       tags:
 *         - Problème à régler
 *       summary: "Obtenir des recommandations de spectacles pour une planification spécifique"
 *       description: |
 *         Cet endpoint propose des recommandations de spectacles basées sur des spectateurs qui ont réservé
 *         pour des spectacles ayant lieu à la même date que celui correspondant à l'`id` donné.
 *       parameters:
 *         - name: schedule_id
 *           in: path
 *           description: "L'identifiant unique de la réservation (Schedule ID) pour laquelle on souhaite obtenir des recommandations."
 *           required: true
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: "Liste des spectacles recommandés."
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: "Titre du spectacle recommandé"
 *                       example: "Les Misérables"
 *         '400':
 *           description: "Requête invalide. Vérifiez les paramètres fournis."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Requête invalide : l'ID de planification est manquant ou incorrect."
 *         '500':
 *           description: "Erreur de serveur lors de la récupération des recommandations."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Erreur de serveur lors de la récupération des données"
 *                   error:
 *                     type: string
 *                     example: "Détails techniques de l'erreur."
 */

/**
 * @swagger
 *  /api/v1/spectacles-likes:
 *   get:
 *     summary: Obtenir la liste des spectacles triée par la moyenne des likes
 *     description: Retourne une liste des spectacles avec leur titre et la moyenne des "likes" obtenus via les réactions des spectateurs.
 *       Les spectacles sont triés par ordre décroissant de la moyenne des likes. On pourra par la suite faire un trie pour proposer le spectacle du même genre le plus aimé.
 *     responses:
 *       200:
 *         description: Liste des spectacles triée par moyenne des likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   spectacle_title:
 *                     type: string
 *                     description: Le titre du spectacle
 *                     example: Les Misérables
 *                   avg_likes:
 *                     type: number
 *                     format: float
 *                     description: La moyenne des "likes" pour ce spectacle
 *                     example: 444
 *       500:
 *         description: Erreur serveur lors de la récupération des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Erreur de serveur lors de la récupération des données"
 *                 error:
 *                   type: string
 *                   description: Détail de l'erreur
 *                   example: "ER_BAD_FIELD_ERROR: Champ inconnu dans la requête"
 */

/**
 * @swagger
 * /api/v1/theatres-notes:
 *   get:
 *     summary: Obtenir la liste des théâtres triée par la note moyenne des spectacles
 *     description: Retourne une liste des théâtres avec leur nom et la note moyenne des spectacles joués dans leurs salles. Les théâtres sont triés par ordre décroissant de la note moyenne.
 *     tags:
 *       - Problème à régler
 *     responses:
 *       200:
 *         description: Liste des théâtres triée par note moyenne des spectacles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Le nom du théâtre
 *                     example: Théâtre de Paris
 *                   avg_rating:
 *                     type: number
 *                     format: float
 *                     description: La note moyenne des spectacles joués dans le théâtre
 *                     example: 4.7
 *       500:
 *         description: Erreur serveur lors de la récupération des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Erreur de serveur lors de la récupération des données"
 *                 error:
 *                   type: string
 *                   description: Détail de l'erreur
 *                   example: "ER_BAD_FIELD_ERROR: Champ inconnu dans la requête"
 */

/**
 * @swagger
 *  /api/v1/artistes-fonctions:
 *   get:
 *     summary: Récupère les artistes ayant tenu au moins trois fonctions différentes.
 *     description: Cette route retourne la liste des artistes qui ont occupé au moins trois fonctions différentes dans le système.
 *     tags: [Problème à régler]
 *     responses:
 *       200:
 *         description: Liste des artistes ayant au moins trois fonctions différentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *       500:
 *         description: Erreur serveur lors de la récupération des données.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur de serveur lors de la récupération des données"
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur serveur"
*/

/**
 * @swagger
 * paths:
 *   /api/v1/revenues-by-spectacle:
 *     get:
 *       summary: "Afficher les recettes par spectacle"
 *       description: |
 *         Cet endpoint récupère la liste des recettes totales par spectacle, triées par ordre décroissant.
 *       responses:
 *         '200':
 *           description: "Liste des recettes par spectacle."
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Spectacle_Title:
 *                       type: string
 *                       description: "Titre du spectacle"
 *                       example: "Le Grand Spectacle"
 *                     Total_Revenue:
 *                       type: number
 *                       description: "Recette totale du spectacle"
 *                       example: 12000.50
 *         '500':
 *           description: "Erreur lors de la récupération des données."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: "Message d'erreur général"
 *                     example: "Erreur de serveur lors de la récupération des données"
 *                   error:
 *                     type: string
 *                     description: "Détails techniques de l'erreur"
 *                     example: "Détail de l'erreur."
*/

/**
 * @swagger
 * /api/v1/spectacles-complet:
 *   get:
 *     summary: Récupère les spectacles ayant affiché complet parmi ceux qui ne se jouent plus.
 *     description: |
 *       Cet endpoint retourne la liste des spectacles ayant affiché complet, 
 *       en fonction des salles ayant atteint leur capacité maximale et dont les représentations sont terminées.
 *       Dans le cas où l'array est vide c'est qu'il n'y a pas de spectacle ayant à la fois affiché complet, et dont les reprséentation sont terminés.
 *     responses:
 *       200:
 *         description: Liste des spectacles complets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Titre du spectacle.
 *                     example: "Le Lac des Cygnes"
 *                   theatre_name:
 *                     type: string
 *                     description: Nom du théâtre où le spectacle a été joué.
 *                     example: "Théâtre National"
 *       500:
 *         description: Erreur serveur lors de la récupération des données.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la récupération des données."
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
*/

/**
 * @swagger
 * /api/v1/artistes-preferes:
 *   get:
 *     summary: Récupère les artistes préférés des spectateurs
 *     description: |
 *       Cet endpoint retourne la liste des artistes préférés des spectateurs,
 *       basée sur la moyenne des notations des spectacles auxquels ils ont participé.
 *     responses:
 *       200:
 *         description: Liste des artistes préférés avec leur moyenne de notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: Prénom de l'artiste.
 *                     example: "Jean"
 *                   lastName:
 *                     type: string
 *                     description: Nom de famille de l'artiste.
 *                     example: "Dupont"
 *                   avg_rating:
 *                     type: number
 *                     format: float
 *                     description: Moyenne des notations des spectacles auxquels l'artiste a participé.
 *                     example: 4.8
 *       500:
 *         description: Erreur serveur lors de la récupération des données.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la récupération des données."
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
*/

/** POST */
/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Crée un nouvel utilisateur (inscription).
 *     description: |
 *       Cet endpoint permet à un utilisateur de s'inscrire en fournissant un nom d'utilisateur, un mot de passe, une adresse e-mail,
 *       une date de naissance, un prénom et un nom de famille.
 *       Si la création réussit, l'ID de l'utilisateur nouvellement créé est retourné.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur choisi par l'utilisateur.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *                 example: "P@ssw0rd"
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *                 example: "johndoe@example.com"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'utilisateur (format YYYY-MM-DD).
 *                 example: "1990-01-01"
 *               first_name:
 *                 type: string
 *                 description: Prénom de l'utilisateur.
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 description: Nom de famille de l'utilisateur.
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation de la création de l'utilisateur.
 *                   example: "Utilisateur créé avec succès"
 *                 userId:
 *                   type: integer
 *                   description: Identifiant unique de l'utilisateur nouvellement créé.
 *                   example: 123
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la création de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de l'inscription"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/associate-artist-spectacle:
 *   post:
 *     summary: Associe un artiste à un spectacle.
 *     description: Cet endpoint permet d'associer un artiste à un spectacle en spécifiant leurs identifiants.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_id:
 *                 type: integer
 *                 description: Identifiant de l'artiste.
 *                 example: 1
 *               spectacle_id:
 *                 type: integer
 *                 description: Identifiant du spectacle.
 *                 example: 5
 *     responses:
 *       201:
 *         description: Artiste associé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Artiste associé avec succès"
 *                 roleId:
 *                   type: integer
 *                   description: Identifiant unique du rôle créé.
 *                   example: 42
 *       500:
 *         description: Erreur serveur lors de l'association de l'artiste.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de l'association"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/create-spectacle:
 *   post:
 *     summary: Crée un nouveau spectacle.
 *     description: Cet endpoint permet de créer un nouveau spectacle en fournissant les informations nécessaires, telles que le titre, le synopsis, la durée, le prix, la langue et la catégorie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du spectacle.
 *                 example: "Le Combat"
 *               synopsis:
 *                 type: string
 *                 description: Résumé ou description du spectacle.
 *                 example: "Un développeur se bat pour rendre le projet le plus complet possible"
 *               duration:
 *                 type: string
 *                 format: time
 *                 description: Durée du spectacle au format HH:mm:ss.
 *                 example: "99:99:99"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Prix du billet pour le spectacle.
 *                 example: 20
 *               language:
 *                 type: string
 *                 enum: ['français', 'VO', 'surtitré', 'audio']
 *                 description: Langue du spectacle.
 *                 example: "français"
 *               category_id:
 *                 type: integer
 *                 description: Identifiant de la catégorie à laquelle appartient le spectacle.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Spectacle créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Spectacle créé avec succès"
 *                 spectacleId:
 *                   type: integer
 *                   description: Identifiant unique du spectacle nouvellement créé.
 *                   example: 42
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur indiquant les problèmes dans les données fournies.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la création du spectacle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la création"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/reserve-seat:
 *   post:
 *     summary: Effectue une réservation pour un spectacle.
 *     description: Cet endpoint permet à un utilisateur de réserver un siège pour une session spécifique d'un spectacle.
 *     tags: [Problème bdd]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule_id:
 *                 type: integer
 *                 description: Identifiant de l'horaire du spectacle.
 *                 example: 10
 *               user_id:
 *                 type: integer
 *                 description: Identifiant de l'utilisateur effectuant la réservation.
 *                 example: 5
 *               booked:
 *                 type: boolean
 *                 description: Statut de réservation (true pour réservé, false sinon).
 *                 example: true
 *     responses:
 *       201:
 *         description: Réservation effectuée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Réservation effectuée avec succès"
 *                 reservationId:
 *                   type: integer
 *                   description: Identifiant unique de la réservation nouvellement créée.
 *                   example: 42
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la réservation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la réservation"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/** PUT */

/**
 * @swagger
 * /api/v1/update-password/{user_id}:
 *   put:
 *     summary: Met à jour le mot de passe d'un utilisateur.
 *     description: Cet endpoint permet de modifier le mot de passe d'un utilisateur en fournissant son identifiant et un nouveau mot de passe.
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: Identifiant de l'utilisateur dont le mot de passe doit être modifié.
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *                 description: Nouveau mot de passe à définir pour l'utilisateur.
 *                 example: "NouveauMotDePasse123!"
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Mot de passe mis à jour avec succès"
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la mise à jour du mot de passe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la mise à jour"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/add-reservation/{schedule_id}:
 *   put:
 *     summary: Ajouter une place à une réservation non payée et mettre à jour le montant total.
 *     description: Cet endpoint permet d'ajouter des places à une réservation spécifique si le paiement n'a pas encore été effectué, et met à jour le montant total à payer.
 *     parameters:
 *       - name: schedule_id
 *         in: path
 *         required: true
 *         description: Identifiant de la session de la réservation.
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               additional_booked:
 *                 type: integer
 *                 description: Nombre de places supplémentaires à ajouter à la réservation.
 *                 example: 2
 *               new_total_amount:
 *                 type: number
 *                 format: float
 *                 description: Nouveau montant total à payer après l'ajout des places.
 *                 example: 150.0
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Réservation mise à jour avec succès"
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la réservation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de l'ajout"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/increase-spectacle-price/{date}:
 *   put:
 *     summary: Augmente le prix des spectacles d'un jour donné de 10%.
 *     description: Cet endpoint applique une augmentation de 10% sur le prix des spectacles ayant lieu un jour donné, sauf pour les réservations déjà payées.
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: La date des spectacles concernés (format YYYY-MM-DD).
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-25"
 *     responses:
 *       200:
 *         description: Les prix des spectacles ont été mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Prix des spectacles mis à jour avec succès"
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la mise à jour des prix.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de l'augmentation"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/** DELETE */

/**
 * @swagger
 * /api/v1/delete-reservation:
 *   delete:
 *     summary: Supprime une réservation en fonction du spectateur et du spectacle.
 *     description: Cet endpoint permet de supprimer une réservation spécifique en fournissant l'identifiant de l'utilisateur et celui du spectacle.
 *     tags: [Pb bdd]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: Identifiant de l'utilisateur ayant effectué la réservation.
 *                 example: 42
 *               spectacle_id:
 *                 type: integer
 *                 description: Identifiant du spectacle lié à la réservation.
 *                 example: 15
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Réservation supprimée avec succès"
 *       404:
 *         description: Aucune réservation trouvée correspondant aux critères fournis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur indiquant qu'aucune réservation n'a été trouvée.
 *                   example: "Aucune réservation trouvée pour ces critères"
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de la suppression de la réservation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de la suppression"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/**
 * @swagger
 * /api/v1/cancel-spectacle/{spectacle_id}:
 *   delete:
 *     summary: Annule un spectacle spécifique.
 *     description: Cet endpoint permet de supprimer un spectacle en fournissant son identifiant.
 *     parameters:
 *       - name: spectacle_id
 *         in: path
 *         required: true
 *         description: Identifiant du spectacle à annuler.
 *         schema:
 *           type: integer
 *           example: 15
 *     responses:
 *       200:
 *         description: Spectacle annulé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation.
 *                   example: "Spectacle annulé avec succès"
 *       404:
 *         description: Spectacle non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur indiquant que le spectacle n'a pas été trouvé.
 *                   example: "Spectacle non trouvé"
 *       400:
 *         description: Données de requête invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur pour des données invalides.
 *                   example: "Les données fournies ne sont pas valides."
 *       500:
 *         description: Erreur serveur lors de l'annulation du spectacle.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur général.
 *                   example: "Erreur de serveur lors de l'annulation"
 *                 error:
 *                   type: string
 *                   description: Détails techniques de l'erreur.
 *                   example: "Détail de l'erreur."
 */

/** INSERT */

