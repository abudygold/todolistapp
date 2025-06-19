import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../core/service';
import {
	DATA_SOURCE,
	DEVELOPER_LIST,
	DISPLAYED_COLUMNS,
	DISPLAYED_LABELS,
	PRIORITY_BG_COLOR,
	PRIORITY_OPTIONS,
	STATUS_BG_COLOR,
	STATUS_OPTIONS,
	TYPE_BG_COLOR,
	TYPE_OPTIONS,
} from './shared/const';
import { Task } from './shared/model';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-main-table',
	imports: [
		FormsModule,
		DatePipe,
		MatSortModule,
		MatTableModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
	],
	templateUrl: './main-table.html',
	styleUrl: './main-table.scss',
})
export class MainTable implements AfterViewInit {
	apiService = inject(ApiService);

	isLoading = signal<boolean>(false);

	displayedColumns: string[] = DISPLAYED_COLUMNS;
	displayedLabels: string[] = DISPLAYED_LABELS;
	developerList: string[] = DEVELOPER_LIST;
	dataSource = new MatTableDataSource<Task>(DATA_SOURCE);
	selection = new SelectionModel<Task>(true, []);

	@ViewChild(MatSort) sort!: MatSort;

	constructor() {
		// this.#fetchData();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	#fetchData(): void {
		this.isLoading.set(true);
		this.apiService.getData().subscribe({
			next: data => {
				this.dataSource.data = data;
			},
			complete: () => {
				this.isLoading.set(false);
			},
			error: error => {
				console.error('Error fetching data:', error);
				this.isLoading.set(false);
			},
		});
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: Task): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filterPredicate = (data: Task, filter: string) => {
			return data.task.toLowerCase().includes(filter);
		};
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	applyFilterByDeveloper(value: string = 'all') {
		if (value === 'all') {
			this.dataSource.filter = '';
			return;
		}

		this.dataSource.filterPredicate = (data: Task, filter: string) => {
			return data.developer.toLowerCase().includes(filter);
		};
		this.dataSource.filter = value.trim().toLowerCase();
	}

	addTask(): void {
		const newTask: Task = {
			id: this.dataSource.data.length + 1,
			task: '',
			developer: '',
			photo: 'avatar.jpg',
			status: '',
			priority: '',
			type: '',
			date: new Date(),
			estimatedSP: 0,
			actualSP: 0,
			isNewRow: true,
		};

		this.dataSource.data = [...this.dataSource.data, newTask];
		this.dataSource._updateChangeSubscription();
	}

	editTask(task: Task): void {
		const index = this.dataSource.data.findIndex(t => t.id === task.id);

		if (index !== -1) {
			this.dataSource.data[index] = { ...task, isNewRow: true };
			this.dataSource._updateChangeSubscription();
		}
	}

	saveTask(task: Task): void {
		const index = this.dataSource.data.findIndex(t => t.id === task.id);

		if (index !== -1) {
			this.dataSource.data[index] = { ...task, isNewRow: false };
			this.dataSource._updateChangeSubscription();
		}
	}

	cancelTask(task: Task): void {
		if (task.isNewRow) {
			this.dataSource.data = this.dataSource.data.filter(t => t.id !== task.id);
		} else {
			const index = this.dataSource.data.findIndex(t => t.id === task.id);
			if (index !== -1) {
				this.dataSource.data[index] = { ...this.dataSource.data[index], isNewRow: false };
			}
		}

		this.dataSource._updateChangeSubscription();
	}

	getCellClass(columnKey: string, columnValue: string): string {
		switch (columnKey) {
			case 'status':
				return STATUS_BG_COLOR(columnValue);
			case 'priority':
				return PRIORITY_BG_COLOR(columnValue);
			case 'type':
				return TYPE_BG_COLOR(columnValue);
			default:
				return '';
		}
	}

	getOptions(columnKey: string): string[] {
		switch (columnKey) {
			case 'status':
				return STATUS_OPTIONS;
			case 'priority':
				return PRIORITY_OPTIONS;
			case 'type':
				return TYPE_OPTIONS;
			default:
				return [];
		}
	}
}
