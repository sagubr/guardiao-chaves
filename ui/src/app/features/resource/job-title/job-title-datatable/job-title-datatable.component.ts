import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Columns, ColumnType, TableWrapper } from "@app/shared/components/table-wrapped/table-wrapper";
import { finalize, Subscription } from "rxjs";
import { JobTitle } from "@openapi/model/jobTitle";
import { JobTitleService } from "@openapi/api/jobTitle.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {
	JobTitleFormDialogComponent
} from "@app/features/resource/job-title/job-title-form-dialog/job-title-form-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
	JobTitleHistoryDialogComponent
} from "@app/features/resource/job-title/job-title-history-dialog/job-title-history-dialog.component";

@Component({
	selector: 'app-job-title-datatable',
	imports: [
		MatTableModule,
		MatIconModule,
		MatMenuModule,
		MatButtonModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatSortModule,
		TableWrapper,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
	],
	templateUrl: './job-title-datatable.component.html',
	styleUrl: './job-title-datatable.component.scss'
})
export class JobTitleDatatableComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	dataSource: MatTableDataSource<JobTitle> = new MatTableDataSource<JobTitle>([]);
	columns: Columns<JobTitle>[] = [
		{
			definition: 'name',
			header: 'Cargo',
			type: ColumnType.TEXT,
			cell: (jobTitle: JobTitle) => jobTitle.name
		},
		{
			definition: 'descripttion',
			header: 'Descrição',
			type: ColumnType.TEXT,
			cell: (jobTitle: JobTitle) => jobTitle.description
		},
	];
	displayedColumns: string[] = [...this.columns.map(c => c.definition), 'star'];
	pageSizeOptions = [5, 10, 20, 50, 100];

	loading: boolean = false;
	private subscriptions: Subscription = new Subscription();

	constructor(
		private readonly jobTitleService: JobTitleService,
		private dialog: MatDialog
	) {
	}

	ngOnInit(): void {
		this.findAll();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	onSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.dataSource.filter = value.trim().toLowerCase();
	}

	onReload(): void {
		this.findAll();
	}

	openCreateDialog(): void {
		this.dialog.open(JobTitleFormDialogComponent, {
			data: {},
		}).afterClosed().subscribe(() => this.onReload());
	}

	openEditDialog(data: JobTitle) {
		this.dialog.open(JobTitleFormDialogComponent, {
			data,
			width: '540px'
		}).afterClosed().subscribe(() => this.findAll());
	}

	openHistoryDialog(element: JobTitle): void {
		this.dialog.open(JobTitleHistoryDialogComponent, {
			data: element,
		}).afterClosed().subscribe(() => this.onReload());
	}

	private findAll(): void {
		this.loading = true;
		this.jobTitleService
			.findAllJobTitle()
			.pipe(finalize(
				() => this.loading = false
			))
			.subscribe({
				next: (JobTitle) => {
					this.dataSource.data = JobTitle;
				}
			});
	}

}

