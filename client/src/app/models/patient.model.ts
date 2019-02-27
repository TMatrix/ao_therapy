// import { SchemeID } from '@app/models/normalizr.model';

export interface Patient {
	// id: SchemeID;
	id?: number;
	firstname: string;
	lastname: string;
	age: number;
	sex: string;
	case: number;
	department: string;
	date: Date;
}
