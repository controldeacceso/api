import { db } from "../lib/firebase";
import { Router } from "express";
import { InOutType, InAndOuts } from "../lib/typing";
import logger from "../lib/logger";

const router = Router();

router.post('/:rfid', async (req, res) => {
	try {
		const _res = await db.collection('students').where('RFID', '==', req.params.rfid).get();
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

		const doc = await db.collection('in-outs').where('sid', '==', _res.docs[0].id).where('created', '>=', ~~(today.getTime() / 1000)).orderBy('created', 'desc').get();
	

		if (doc.empty) {
			const inOut: InAndOuts = {
				type: InOutType.IN,
				timestamp: ~~(Date.now() / 1000)
			}

			await db.collection('in-outs').add({
				sid: _res.docs[0].id,
				created: ~~(Date.now() / 1000),
				inAndOuts: [ inOut ]
			});
		} else {
			const inAndOuts = doc.docs[0].data().inAndOuts;
			const lastInOut = inAndOuts[inAndOuts.length - 1];

			const nextInOut = {
				type: lastInOut.type === InOutType.IN ? InOutType.OUT : InOutType.IN,
				timestamp: ~~(Date.now() / 1000)
			}

			await db.collection('in-outs').doc(doc.docs[0].id).update({
				inAndOuts: [...doc.docs[0].data().inAndOuts, nextInOut]
			});
		}


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

export = router;
