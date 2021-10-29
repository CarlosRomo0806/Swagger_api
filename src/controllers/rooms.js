const Database = require('../models/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let secret = process.env.JWTSECRET;
let host = process.env.HOST;
class RoomController {
    static authPer(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            return;
        }
        let reg = [];
        reg.push(decoded.rol);
        reg.push(decoded.email);
        reg.push(decoded.id);
        return reg;
    }

    static create(req, res) {
        const database = new Database('rooms')
        const datarela = new Database('roomUser');
        console.log(req.headers);
        let token = req.headers["x-auth"];
        let userPer = RoomController.authPer(token);
        if (!userPer) {
            return res.status(401).end()
        }
        if (!req.body.name) {
            res.statusMessage = "Name is missing!";
            return res.status(400).end();
        }
        let id = "" + Math.random().toString(36).substr(2, 9)
        database.insertOne({
                name: req.body.name,
                owner: userPer[1],
                id: id
            }).then(response => {
                datarela.insertOne({
                    user: userPer[1],
                    sala: id
                })
                return res.status(201).end();
            })
            .catch(error => {
                res.statusMessage = "The name already exist";
                return res.status(400).end();
            });
        datarela.insertOne({
            user: userPer[1],
            sala: id
        })
    }

    static createLink(req, res) {
        const database = new Database('rooms');
        let token = req.headers["x-auth"];
        let userPer = SalaController.authPer(token);
        if (!userPer) {
            return res.status(401).end()
        }
        database.findOne({
            name: req.body.name
        }).then(
            results => {
                if (results) {
                    if (userPer[1] != results.owner) {
                        return res.status(401).end()
                    } else {
                        return res.status(201).send(host + "api/rooms/link/" + results.id);
                    }
                } else {
                    res.statusMessage = "The room does not exist!";
                    return res.status(400).end();
                }
            })
    }

    static signSalaLink(req, res) {
        const database = new Database('rooms')
        const datarela = new Database('roomUser')
        console.log(req.params.id)
        let token = req.headers["x-auth"];
        let userPer = SalaController.authPer(token);
        if (!userPer) {
            return res.status(401).end()
        }
        database.findOne({
            id: req.params.id
        }).then(
            results => {
                if (results) {
                    datarela.insertOne({
                            user: userPer[1],
                            sala: req.params.id,
                            id: "" + Math.random().toString(36).substr(2, 9)
                        }).then(response => {
                            return res.status(201).end();
                        })
                        .catch(error => {
                            res.statusMessage = "User already registered!";
                            return res.status(400).end();
                        });
                } else {
                    res.statusMessage = "The room does not exist!";
                    return res.status(400).end();
                }
            })
    }

}

module.exports = RoomController;