"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
require("dotenv/config");
exports.port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000;
