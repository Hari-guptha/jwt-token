"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const token_schema = new mongoose_1.default.Schema({
    access_token: {
        type: String,
        required: false
    },
    refresh_token: {
        type: String,
        required: false
    }
}, { versionKey: false });
const token_model = mongoose_1.default.model('tokens', token_schema);
exports.default = token_model;
