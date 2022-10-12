import logger from './lib/logger';
import { checkToken } from './lib/utils';


import helmet from 'helmet';
import * as cors from 'cors';
import * as express from 'express';
import * as recursiveRouting from 'recursive-routing';

const app = express();



(async () => {
	app.use(express.json());
	app.use(cors());
	app.use(helmet());
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

		if (!checkToken(token)) {
			return res.status(403).send({
				'code': 403,
				'message': 'Forbidden'
			});
		}

		next();
	});


	await recursiveRouting(app, {
		'rootDir': `${__dirname}/routes`,
		'filter': (file: string) => {
			if (file.endsWith('.map.js')) return false;

			return file.endsWith('.js');
		}
	});
	
	
	app.all('*', async (req, res) => {
		res.status(400).send({ 'code': 400, 'message': 'Bad Request' });
	});

	app.listen(process.env.PORT, () => {
		logger.info(`Server started on port ${process.env.PORT}`);
	});
})();
