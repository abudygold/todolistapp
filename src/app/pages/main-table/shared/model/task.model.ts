export interface Task {
	id: number;
	task: string;
	developer: string;
	photo: string;
	status: string;
	priority: string;
	type: string;
	date: Date;
	estimatedSP: number;
	actualSP: number;
	isNewRow: boolean;
}
