import { Component } from '@angular/core';
import { MainTable } from './pages/main-table';
import { Kanban } from './pages/kanban';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
	selector: 'app-root',
	imports: [MatTabsModule, MatIconModule, MainTable, Kanban],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {}
