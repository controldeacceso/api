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
const firebase_1 = require("../lib/firebase");
const express_1 = require("express");
const logger_1 = require("../lib/logger");
const router = (0, express_1.Router)();
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (typeof data.rfid !== 'string') {
            return res.status(400).send({
                'code': 400,
                'message': 'Invalid request body'
            });
        }
        const _res = yield firebase_1.db.collection('students').where('RFID', '==', data.rfid).get();
        if (!_res.empty) {
            return res.status(403).send({
                'code': 403,
                'message': 'The RFID is already registered'
            });
        }
        yield firebase_1.db.collection('students').add({
            RFID: data.rfid,
            created: ~~(Date.now() / 1000)
        });
        res.status(200).send({
            'code': 200,
            'message': 'Success'
        });
    }
    catch (e) {
        logger_1.default.error(`rfid.ts: ${e}\n${e.stack}`);
        res.status(500).send({
            'code': 500,
            'message': 'Internal server error'
        });
    }
}));
router.delete('/:rfid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rfid = req.params.rfid;
        if (typeof rfid !== 'string') {
            return res.status(400).send({
                'code': 400,
                'message': 'Invalid request body'
            });
        }
        const _res = yield firebase_1.db.collection('students').where('RFID', '==', rfid).get();
        if (_res.empty) {
            return res.status(403).send({
                'code': 403,
                'message': 'The RFID is not registered'
            });
        }
        yield firebase_1.db.collection('students').doc(_res.docs[0].id).delete();
        res.status(200).send({
            'code': 200,
            'message': 'Success'
        });
    }
    catch (e) {
        logger_1.default.error(`rfid.ts: ${e}\n${e.stack}`);
        res.status(500).send({
            'code': 500,
            'message': 'Internal server error'
        });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _res = yield firebase_1.db.collection('students').get();
        res.status(200).send({
            'code': 200,
            'message': 'success',
            'data': _res.docs
        });
    }
    catch (e) {
        logger_1.default.error(`rfid.ts: ${e}\n${e.stack}`);
        res.status(500).send({
            'code': 500,
            'message': 'Internal server error'
        });
    }
}));
module.exports = router;
//# sourceMappingURL=rfid.js.map