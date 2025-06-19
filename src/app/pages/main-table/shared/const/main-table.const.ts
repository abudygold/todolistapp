import { Task } from '../model';

export const DISPLAYED_COLUMNS: string[] = [
	'select',
	'task',
	'photo',
	'status',
	'priority',
	'type',
	'date',
	'estimatedSP',
	'actualSP',
	'actions',
];

export const DISPLAYED_LABELS: string[] = [
	'Select',
	'Task',
	'Developer',
	'Status',
	'Priority',
	'Type',
	'Date',
	'Estimated SP',
	'Actual SP',
	'Actions',
];

export const DATA_SOURCE: Task[] = [
	{
		id: 1,
		task: 'Task 1',
		developer: 'Alice',
		photo: 'avatar.jpg',
		status: 'In Progress',
		priority: 'Best Effort',
		type: 'Feature Enhancement',
		date: new Date('2023-10-01'),
		estimatedSP: 2,
		actualSP: 1,
		isNewRow: false,
	},
	{
		id: 2,
		task: 'Task 2',
		developer: '',
		photo: '',
		status: 'Ready to start',
		priority: 'Medium',
		type: 'Bug',
		date: new Date('2023-10-02'),
		estimatedSP: 3,
		actualSP: 3,
		isNewRow: false,
	},
	{
		id: 3,
		task: 'Task 3',
		developer: 'Charlie',
		photo: 'avatar.jpg',
		status: 'Waiting for review',
		priority: 'Low',
		type: 'Other',
		date: new Date('2023-10-03'),
		estimatedSP: 1,
		actualSP: 0,
		isNewRow: false,
	},
	{
		id: 4,
		task: 'Task 4',
		developer: '',
		photo: '',
		status: 'In Progress',
		priority: 'Best Effort',
		type: 'Feature Enhancement',
		date: new Date('2023-10-04'),
		estimatedSP: 2,
		actualSP: 1,
		isNewRow: false,
	},
	{
		id: 5,
		task: 'Task 5',
		developer: 'Eve',
		photo: 'avatar.jpg',
		status: 'Waiting for review',
		priority: 'Low',
		type: 'Bug',
		date: new Date('2023-10-05'),
		estimatedSP: 1,
		actualSP: 0,
		isNewRow: false,
	},
];

export const STATUS_OPTIONS: string[] = ['In Progress', 'Ready to start', 'Waiting for review'];

export const PRIORITY_OPTIONS: string[] = ['Best Effort', 'High', 'Medium', 'Low'];

export const TYPE_OPTIONS: string[] = ['Feature Enhancement', 'Bug', 'Other'];

export const DEVELOPER_LIST: string[] = DATA_SOURCE.map(task => task.developer)
	.filter(developer => developer)
	.sort();

export const STATUS_BG_COLOR = (value: string): string => {
	switch (value) {
		case 'In Progress':
			return '!tw-bg-[#F4B266] tw-text-white';
		case 'Ready to start':
			return '!tw-bg-[#2979FF] tw-text-white';
		case 'Waiting for review':
			return '!tw-bg-[#9DD9F3] tw-text-white';
		default:
			return '';
	}
};

export const PRIORITY_BG_COLOR = (value: string): string => {
	switch (value) {
		case 'Best Effort':
			return '!tw-bg-[#A59D94] tw-text-white';
		case 'High':
			return '!tw-bg-[#9886E5] tw-text-white';
		case 'Medium':
			return '!tw-bg-[#94B5FF] tw-text-white';
		case 'Low':
			return `!tw-bg-[#F4B266] tw-text-white`;
		default:
			return '';
	}
};

export const TYPE_BG_COLOR = (value: string): string => {
	switch (value) {
		case 'Feature Enhancement':
			return '!tw-bg-[#F6B1B1] tw-text-white';
		case 'Bug':
			return '!tw-bg-[#FF5C5C] tw-text-white';
		case 'Other':
			return '!tw-bg-[#CAB8FF] tw-text-white';
		default:
			return '';
	}
};

export const PRIORITY_BORDER_LEFT_COLOR = (value: string): string => {
	switch (value) {
		case 'Best Effort':
			return '!tw-border-l-[#A59D94]';
		case 'High':
			return '!tw-border-l-[#9886E5]';
		case 'Medium':
			return '!tw-border-l-[#94B5FF] ';
		case 'Low':
			return `!tw-border-l-[#F4B266]`;
		default:
			return '';
	}
};

export const TYPE_BORDER_LEFT_COLOR = (value: string): string => {
	switch (value) {
		case 'Feature Enhancement':
			return '!tw-border-l-[#F6B1B1]';
		case 'Bug':
			return '!tw-border-l-[#FF5C5C]';
		case 'Other':
			return '!tw-border-l-[#CAB8FF]';
		default:
			return '';
	}
};
