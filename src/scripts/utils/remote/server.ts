// @ts-nocheck beacuse typescript doesn't seem to know how tf express works :)
import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'SnailyCAD Manager Remote Server Boilerplate Created!',
    });
});
