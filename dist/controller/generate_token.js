"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_refresh_token = exports.gen_access_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gen_access_token = (user_id) => {
    console.log('in  the  access');
    const access_token = jsonwebtoken_1.default.sign({ id: user_id }, `${process.env.Access_secret}`, { expiresIn: '10s' });
    return access_token;
};
exports.gen_access_token = gen_access_token;
const gen_refresh_token = (user_id) => {
    console.log('in  the  refresh');
    const refresh_token = jsonwebtoken_1.default.sign({ id: user_id }, `${process.env.Refresh_secret}`);
    return refresh_token;
};
exports.gen_refresh_token = gen_refresh_token;
