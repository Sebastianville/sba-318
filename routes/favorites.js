import { Router } from "express";

export const favoriteRouter = new Router();

favoriteRouter.get('/', (req, res) => {
    res.status(200).json({
        "Status": "Ok"
    })
})