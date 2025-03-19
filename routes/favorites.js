import { Router } from "express";
export const favoriteRouter = new Router();
const favorites = require("../data/favorites");

favoriteRouter
    .route("/")
    .get((req, res) => {
        res.json(favorites);
    })
    .post((req, res) => {
        if (!req.body.resource_id || !req.body.user_id || !req.body.personal_comment) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newFavorite = {
            resource_id: req.body.resource_id,
            user_id: req.body.user_id,
            personal_comment: req.body.personal_comment,
        };

        favorites.push(newFavorite);
        res.status(201).json(newFavorite);
    });

// Get a specific favorite by resource_id and user_id
favoriteRouter
    .route("/:resource_id/:user_id")
    .get((req, res) => {
        const favorite = favorites.find(
            (fav) => fav.resource_id == req.params.resource_id && fav.user_id == req.params.user_id
        );

        if (favorite) {
            res.json(favorite);
        } else {
            res.status(404).send("Favorite not found");
        }
    })