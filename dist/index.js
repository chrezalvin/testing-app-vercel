"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug")("Server:events");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const middlwares_1 = require("./middlwares");
const express = (0, express_1.default)();
express.use((0, cors_1.default)());
express.use((0, morgan_1.default)("dev"));
express.use(express_1.default.json());
express.use(express_1.default.urlencoded());
express.use((0, cookie_parser_1.default)());
express.use(routes_1.default);
// catch 404 and forward to error handler
express.use((0, middlwares_1.page404)());
function discordError(err) {
    if (err === null || typeof err !== "object")
        return false;
    if ("error" in err && typeof err.error === "string")
        if ("error_description" in err && typeof err.error_description === "string")
            return true;
    return false;
}
// error handler
express.use(function (err, _req, res, _next) {
    res.status(err.status || 400);
    if (err instanceof Error) {
        return res.status(400).json({ error: 0, message: err.message });
    }
    if (discordError(err)) {
        return res.status(400).json(Object.assign({}, err));
    }
    return res.status(500).json({ message: "Unknown Error!", error: err });
});
exports.default = express;
