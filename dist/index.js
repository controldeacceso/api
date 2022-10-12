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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./lib/logger");
const utils_1 = require("./lib/utils");
const helmet_1 = require("helmet");
const cors = require("cors");
const express = require("express");
const recursiveRouting = require("recursive-routing");
const app = express();
(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express.json());
    app.use(cors());
    app.use((0, helmet_1.default)());
    app.set('powered-by', false);
    app.use((req, res, next) => {
        const token = req.headers.authorization;
        res.header('Access-Control-Allow-Origin', '*');
        if (!token) {
            return res.status(401).send({
                'code': 401,
                'message': 'Unauthorized'
            });
        }
        if (!(0, utils_1.checkToken)(token)) {
            return res.status(403).send({
                'code': 403,
                'message': 'Forbidden'
            });
        }
        next();
    });
    yield recursiveRouting(app, {
        'rootDir': `${__dirname}/routes`,
        'filter': (file) => {
            if (file.endsWith('.map.js'))
                return false;
            return file.endsWith('.js');
        }
    });
    app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(400).send({ 'code': 400, 'message': 'Bad Request' });
    }));
    app.listen(process.env.PORT, () => {
        logger_1.default.info(`Server started on port ${process.env.PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map