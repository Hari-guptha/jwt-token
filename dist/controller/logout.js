"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("../model/token"));
const route = (0, express_1.Router)();
route.post('/logout', (req, res) => {
    console.log(req.body.refresh_token);
    if (req.body.refresh_token) {
        token_1.default.findOneAndDelete({ refresh_token: req.body.refresh_token })
            .then((result) => {
            console.log('in logout');
            console.log(result);
            if (result) {
                res.send('ok  success');
            }
        });
    }
});
module.exports = route;
