import { Router } from "express";
export const resourceRouter = new Router();
const resources = require('../data/resources')

resourceRouter
    .route('/')
    .get((req, res) => {
        res.json(resources);
    })
    .post((req, res) => {
        if (!req.body.title || !req.body.link || !req.body.description || !req.body.resource_type) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newResource = {
            id: resources.length ? resources[resources.length - 1].id + 1 : 1,
            title: req.body.title,
            link: req.body.link,
            description: req.body.description,
            resource_type: req.body.resource_type
        };

        resources.push(newResource);
        res.status(201).json(newResource);
    });

resourceRouter
    .route('/:resourceID')
    .get((req, res) => {
        const resource = resources.find(r => r.id == req.params.resourceID);
        if (resource) res.json(resource);
        else res.status(404).send('Resource not found');
    })
    .patch((req, res) => {
        const resource = resources.find((r, i) => {
            if (r.id == req.params.resourceID) {
                for (const key in req.body) {
                    resources[i][key] = req.body[key];
                }
                return true;
            }
        });

        if (resource) res.json(resource);
        else res.status(404).send('Resource not found');
    })
    .delete((req, res) => {
        const resourceIndex = resources.findIndex(r => r.id == req.params.resourceID);
        if (resourceIndex !== -1) {
            const deletedResource = resources.splice(resourceIndex, 1);
            res.json(deletedResource);
        } else {
            res.status(404).send('Resource not found');
        }
    });