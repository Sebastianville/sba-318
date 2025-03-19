import { Router } from "express";
export const userRouter = new Router();
const users = require('../data/users')

userRouter
    .route('/')
    .get((req, res) => {
        res.json(users)
    })
    .post((req, res) => {
        if (req.body.username && req.body.password && req.body.email) {
            if (users.find((user) => user.username == req.body.username)) {
                res.json({ error: 'username already exits' })
                return;
            }

        }
        const user = {
            id: users[users.length - 1].id + 1,
            password: req.body.password,
            bio: req.body.bio,
            username: req.body.username,
            email: req.body.email,
        }
        users.push(user)
        res.json(users[users.length - 1])
})


userRouter
    .route('/:usersID')
    .get((req, res) => {
        const user = users.find((user) => user.id == req.params.usersID)
        if (user) { res.json(user) }
        else { res.status(404).send("User not found") }
    })
    .patch((req, res, next) => {
        const user = users.find((user, i) => {
            if (user.id == req.params.usersID) {
                for (const key in req.body) {
                    users[i][key] = req.body[key]
                }
                return true
            }

        })
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).send('User not found')
        }
    })
    .delete((req, res, next) => {
        const user = users.find((user, i) => {
            if (user.id == req.params.usersID) {
                users.splice(i, 1)
                return true
            }
        })
        if (user) res.json(user)
        else {
            res.status(404).send('User not found')
        }
})