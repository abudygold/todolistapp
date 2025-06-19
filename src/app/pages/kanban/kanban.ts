import { Component } from '@angular/core';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
	CdkDrag,
	CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import {
	DATA_SOURCE,
	PRIORITY_BORDER_LEFT_COLOR,
	TYPE_BORDER_LEFT_COLOR,
} from '../main-table/shared/const';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'app-kanban',
	imports: [NgTemplateOutlet, CdkDropList, CdkDrag, MatIconModule],
	templateUrl: './kanban.html',
	styleUrl: './kanban.scss',
})
export class Kanban {
	todo = DATA_SOURCE.filter(t => t.status === 'Ready to start');
	inProgress = DATA_SOURCE.filter(t => t.status === 'In Progress');
	waitingForReview = DATA_SOURCE.filter(t => t.status === 'Waiting for review');
	done = DATA_SOURCE.filter(t => t.status === 'Done');

	drop(event: CdkDragDrop<any[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			// Update the status of the moved item based on the target list
			const containerId = event.container.id;
			let newStatus = '';
			if (containerId.includes('todo')) {
				newStatus = 'Ready to start';
			} else if (containerId.includes('inProgress')) {
				newStatus = 'In Progress';
			} else if (containerId.includes('waitingForReview')) {
				newStatus = 'Waiting for review';
			} else if (containerId.includes('done')) {
				newStatus = 'Done';
			}
			const movedItem = event.container.data[event.currentIndex];
			if (movedItem && newStatus) {
				movedItem.status = newStatus;
			}
		}
	}

	getTagClass(columnKey: string, columnValue: string): string {
		switch (columnKey) {
			case 'priority':
				return PRIORITY_BORDER_LEFT_COLOR(columnValue);
			case 'type':
				return TYPE_BORDER_LEFT_COLOR(columnValue);
			default:
				return '';
		}
	}
}
