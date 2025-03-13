import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { DatePipe, NgForOf } from "@angular/common";
import { JobTitle } from "@openapi/model/jobTitle";

interface Entity {
	id: string;
	name: string;
	description: string;
}

interface History {
	entidade: Entity;
	timestamp: string;
}

@Component({
	selector: 'app-job-title-history-dialog',
	imports: [
		MatCardModule,
		MatButtonModule,
		MatDialogModule,
		NgForOf,
		DatePipe
	],
	templateUrl: './job-title-history-dialog.component.html',
	styleUrl: './job-title-history-dialog.component.scss'
})
export class JobTitleHistoryDialogComponent implements OnInit {

	histories: History[] = [];

	constructor(@Inject(MAT_DIALOG_DATA) public data: JobTitle) {

	}

	ngOnInit(): void {

		console.log(this.data)
		if (this.data.history && Array.isArray(this.data.history)) {
			this.histories = this.data.history;

		}
	}

}
