"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.secureCompare = void 0;
const env_1 = require("../env");
const crypto = require("crypto");
function secureCompare(a, b) {
    if (a.length !== b.length)
        return false;
    var result = 0;
    for (var i = 0; i < a.length; i++)
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return result === 0;
}
exports.secureCompare = secureCompare;
function checkToken(token) {
    const tmp = crypto.createHash('sha256').update(token).digest('hex');
    return secureCompare(tmp, env_1.default.authToken);
}
exports.checkToken = checkToken;
//# sourceMappingURL=utils.js.map