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
const typing_1 = require("../lib/typing");
const logger_1 = require("../lib/logger");
const router = (0, express_1.Router)();
router.post('/:rfid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _res = yield firebase_1.db.collection('students').where('RFID', '==', req.params.rfid).get();
        if (_res.empty) {
            return res.status(403).send({
                'code': 403,
                'message': 'Not authorized'
            });
        }
        const id = _res.docs[0].data().id;
        if (!id) {
            return res.status(403).send({
                'code': 403,
                'message': 'Card is not activated'
            });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const doc = yield firebase_1.db.collection('in-outs').where('sid', '==', _res.docs[0].id).where('created', '>=', ~~(today.getTime() / 1000)).orderBy('created', 'desc').get();
        if (doc.empty) {
            const inOut = {
                type: typing_1.InOutType.IN,
                timestamp: ~~(Date.now() / 1000)
            };
            yield firebase_1.db.collection('in-outs').add({
                sid: _res.docs[0].id,
                created: ~~(Date.now() / 1000),
                inAndOuts: [inOut]
            });
        }
        else {
            const inAndOuts = doc.docs[0].data().inAndOuts;
            const lastInOut = inAndOuts[inAndOuts.length - 1];
            const nextInOut = {
                type: lastInOut.type === typing_1.InOutType.IN ? typing_1.InOutType.OUT : typing_1.InOutType.IN,
                timestamp: ~~(Date.now() / 1000)
            };
            yield firebase_1.db.collection('in-outs').doc(doc.docs[0].id).update({
                inAndOuts: [...doc.docs[0].data().inAndOuts, nextInOut]
            });
        }
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
module.exports = router;
//# sourceMappingURL=check.js.map