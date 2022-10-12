"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console({
            'format': winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`))
        })
    ]
});
exports.default = logger;
//# sourceMappingURL=logger.js.map