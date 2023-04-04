"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../model/user"));
const route = (0, express_1.Router)();
route.post('/signup', (req, res) => {
    console.log('this is signup');
    const signup = new user_1.default(req.body);
    signup.save().then(() => {
        console.log(req.body.username);
    });
    res.sendStatus(200);
});
module.exports = route;
