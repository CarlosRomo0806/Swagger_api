const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

let secret = process.env.JWTSECRET;
class UsersController {
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
    static sign(req, res) {
        const database = new Database('users');
        let {
            name,
            username,
            password,
            email
        } = req.body;
        if (!name || !username || !password || !email) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let codepass = bcrypt.hashSync(password, 10);
        database.insertOne({
                name: name,
                email: email,
                password: codepass,
                username: username,
                rol: "Usuario",
                id: "" + Math.random().toString(36).substr(2, 9)
            }).then(response => {
                res.statusMessage = "User created correctly!";
                return res.status(201).end();
            })
            .catch(error => {
                res.statusMessage = "User already exist!";
                return res.status(400).end();
            });
    }
    static login(req, res) {
        let {
            email,
            password
        } = req.body;
        if (!email || !password) {
            res.statusMessage = "Data is missing";
            return res.status(400).end();
        }
        const database = new Database('users');
        database.findOne({
                email: req.body.email
            })
            .then(results => {
                if (results) {
                    if (!bcrypt.compareSync(password, results.password)) {
                        res.statusMessage = "Incorect password!";
                        return res.status(400).end();
                    }
                    let response = {
                        email: results.email,
                        nombre: results.nombre,
                        rol: results.rol,
                        id: results.id
                    };
                    let token = jwt.sign(response, secret);
                    res.statusMessage = "Login sucess";
                    return res.status(200).send({
                        "email": response.email,
                        "rol": response.rol,
                        "token": token
                    });
                } else {
                    res.statusMessage = "User does not exist!!";
                    return res.status(400).end();
                }
            });
    }

}

module.exports = UsersController;