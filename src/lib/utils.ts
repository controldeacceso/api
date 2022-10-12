import env from "../env";
import * as crypto from 'crypto';


export function secureCompare(a: string, b: string): boolean {
	if (a.length !== b.length) return false;

	var result = 0;

	for (var i = 0; i < a.length; i++)
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);

	return result === 0;
}

export function checkToken(token: string): boolean {
	const tmp = crypto.createHash('sha256').update(token).digest('hex');

	return secureCompare(tmp, env.authToken);
}
