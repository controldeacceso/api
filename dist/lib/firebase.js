"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const env_1 = require("../env");
const fb = require("firebase-admin");
exports.auth = fb.initializeApp({
    credential: fb.credential.cert(env_1.default.firebase),
});
exports.db = exports.auth.firestore();
//# sourceMappingURL=firebase.js.map