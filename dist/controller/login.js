"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../model/user"));
const generate_token_1 = require("./generate_token");
const token_1 = __importDefault(require("../model/token"));
const route = (0, express_1.Router)();
route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield user_1.default.findOne({ username: req.body.username });
    if (result == null) {
        return res.status(401).json('Incorrect Username');
    }
    else {
        if (result.password === req.body.password) {
            const tokens = {
                access_token: (0, generate_token_1.gen_access_token)(result._id.toString()),
                refresh_token: (0, generate_token_1.gen_refresh_token)(result._id.toString())
            };
            const new_token_db = new token_1.default(tokens);
            new_token_db.save();
            console.log(tokens);
            res.json(tokens);
        }
        else {
            res.status(401).json('Incorrect Password');
        }
    }
}));
module.exports = route;
