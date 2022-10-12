import { db } from "../lib/firebase";
import { Router } from "express";
import { RFID_PUT_BODY, RFID_PUT_BODY_SCHEMA, Schema } from "../lib/typing";
import logger from "../lib/logger";

const router = Router();



router.put('/', async (req, res) => {
	try {
		const data: RFID_PUT_BODY = req.body;

		if (typeof data.rfid !== 'string') {
			return res.status(400).send({
				'code': 400,
				'message': 'Invalid request body'
			});
		}

		const _res = await db.collection('students').where('RFID', '==', data.rfid).get();
		if (!_res.empty) {
			return res.status(403).send({
				'code': 403,
				'message': 'The RFID is already registered'
			});
		}

		await db.collection('students').add({
			RFID: data.rfid,
			created: ~~(Date.now() / 1000)
		});

		res.status(200).send({
			'code': 200,
			'message': 'Success'
		});
	} catch (e) {
		logger.error(`rfid.ts: ${e}\n${e.stack}`);

		res.status(500).send({
			'code': 500,
			'message': 'Internal server error'
		});
	}
});

router.delete('/:rfid', async (req, res) => {
	try {
		const rfid = req.params.rfid;
		if (typeof rfid !== 'string') {
			return res.status(400).send({
				'code': 400,
				'message': 'Invalid request body'
			});
		}

		const _res = await db.collection('students').where('RFID', '==', rfid).get();
		if (_res.empty) {
			return res.status(403).send({
				'code': 403,
				'message': 'The RFID is not registered'
			});
		}

		await db.collection('students').doc(_res.docs[0].id).delete();
		res.status(200).send({
			'code': 200,
			'message': 'Success'
		});
	} catch (e) {
		logger.error(`rfid.ts: ${e}\n${e.stack}`);

		res.status(500).send({
			'code': 500,
			'message': 'Internal server error'
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const _res = await db.collection('students').get();

		res.status(200).send({
			'code': 200,
			'message': 'success',
			'data': _res.docs
		})
	} catch (e) {
		logger.error(`rfid.ts: ${e}\n${e.stack}`);

		res.status(500).send({
			'code': 500,
			'message': 'Internal server error'
		});
	}
});

export = router;
