"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../model/token"));
const verify = (req, res, next) => {
    console.log('in verify');
    const token = req.body.access_token;
    console.log(token);
    if (token) {
        token_1.default.findOne({ access_token: token })
            .then((result) => {
            if (result) {
                console.log(result, 'this is result');
                jsonwebtoken_1.default.verify(token, `${process.env.Access_secret}`, (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(403).json('your  not authenticated1');
                    }
                    else {
                        req.user = user;
                        next();
                    }
                });
            }
            else {
                return res.status(403).json('your  not authenticated3');
            }
        });
    }
    else {
        return res.status(403).json('your  not authenticated2');
    }
};
module.exports = verify;
