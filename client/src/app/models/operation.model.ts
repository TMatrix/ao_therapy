export interface Operation {
	id?: number;
	patient_id: number;
	name?: string;
	date: string;
	taa: number;
	lactate: number;
	pyruvate: number;
	treatment: number;
	isRecommended?: boolean;
}
