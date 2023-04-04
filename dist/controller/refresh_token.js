"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../model/token"));
const generate_token_1 = require("./generate_token");
const route = (0, express_1.Router)();
route.post('/refresh', (req, res) => {
    console.log(req.body.token);
    if (req.body.token) {
        jsonwebtoken_1.default.verify(req.body.token, 'mern_auth_refresh_secret', (err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json("You are not authenticated1!");
            }
            token_1.default.findOne({ refresh_token: req.body.token })
                .then((result) => {
                if (result) {
                    const access_tok = (0, generate_token_1.gen_access_token)(user.id);
                    const refresh_tok = (0, generate_token_1.gen_refresh_token)(user.id);
                    const tokens = {
                        access_token: access_tok,
                        refresh_token: refresh_tok
                    };
                    result.access_token = access_tok;
                    result.refresh_token = refresh_tok;
                    result.save();
                    res.json(tokens);
                }
                else {
                    return res.status(401).json("You are not authenticated2!");
                }
            });
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
});
module.exports = route;
