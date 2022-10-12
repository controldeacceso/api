export type Schema = {
	fields: {
		[key: string]: string;
	},
	required?: string[];
}

export namespace Schema {
	export const validate = (schema: Schema, data: any): boolean => {
		if (schema.required) {
			for (const field of schema.required) {
				if (data[field] === undefined) return false;
			}
		}
	
		for (const field in schema.fields) {
			if (data[field] !== undefined) {
				if (typeof data[field] !== schema.fields[field]) return false;
			}
		}
	
		return true;
	}
}




export enum InOutType {
	IN = 0,
	OUT = 1
}

export interface InAndOuts {
	type: InOutType;
	timestamp: number;
}


export interface Students {
	rfid: string;
	created: number;
}

export interface RFID_PUT_BODY extends Omit<Students, 'created'> { }

export const RFID_PUT_BODY_SCHEMA: Schema = {
	fields: {
		rfid: 'string'
	},
	required: ['rfid']
};









