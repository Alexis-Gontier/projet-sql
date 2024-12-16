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

