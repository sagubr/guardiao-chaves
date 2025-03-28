import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '@openapi/api/users.service';
import { Columns, ColumnType, TableWrapper } from "@app/shared/components/table-wrapped/table-wrapper";
import { UserDto } from "@openapi/model/userDto";
import { UserFormDialogComponent } from "@app/features/settings/access/user-form-dialog/user-form-dialog.component";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { UserSummaryDto } from "@openapi/model/userSummaryDto";
import { DialogWrappedInfo, DialogWrappedService } from "@app/shared/components/dialog-wrapped/dialog-wrapped.service";
import { User } from "@openapi/model/user";

@Component({
	selector: 'app-user-datatable',
	imports: [
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatProgressBarModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatSort,
		TableWrapper,
		MatFormField,
		MatInput,
		MatLabel,
		MatSuffix,
		MatToolbar,
		MatToolbarRow,
	],
	templateUrl: './user-datatable.component.html',
	styleUrls: ['./user-datatable.component.scss']
})
export class UserDatatableComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
	columns: Columns<User>[] = [
		{
			definition: 'name',
			header: 'Nome Completo',
			type: ColumnType.TEXT,
			cell: (element: User) => element.name
		},
		{
			definition: 'username',
			header: 'Usuário',
			type: ColumnType.TEXT,
			cell: (element: User) => element.username
		},
		{
			definition: 'email',
			header: 'E-mail',
			type: ColumnType.TEXT,
			cell: (element: User) => element.email
		},
		{
			definition: 'assignment',
			header: 'Atribuição',
			type: ColumnType.TEXT,
			cell: (element: User) => element.assignment?.name
		}
	];
	displayedColumns: string[] = [...this.columns.map(c => c.definition), 'star'];
	pageSizeOptions = [5, 10, 20, 50, 100];

	loading: boolean = false;
	private subscriptions: Subscription = new Subscription();

	constructor(
		private readonly service: UsersService,
		private readonly dialog: MatDialog,
		private readonly dialogWrapped: DialogWrappedService
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
		this.dialog.open(UserFormDialogComponent, {
			data: {},
		}).afterClosed().subscribe(() => this.onReload());
	}

	openEditDialog(data: User) {
		this.dialog.open(UserFormDialogComponent, {
			data
		}).afterClosed().subscribe(() => this.findAll());
	}

	openResetPasswordDialog(element: UserDto): void {
		this.dialogWrapped.openFeedback(
			{
				title: "Tem certeza que deseja redefinir a senha?",
				message: `A senha atual será redefinida e a nova senha será enviada para o e-mail cadastrado: ${ element.email }`,
				icon: "warning"
			} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
	}

	openBlockUserDialog(element: UserDto): void {
		this.dialogWrapped.openFeedback(
			{
				title: "Tem certeza que deseja bloquear o usuário?",
				message: `O usuário ${ element.username } não consiguirá acessar a aplicação. Esta ação só poderá ser revertida via banco de dados.`,
				icon: "warning"
			} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
	}

	private findAll(): void {
		this.loading = true;
		this.service.findAllUser()
			.pipe(
				finalize(() => this.loading = false)
			).subscribe({
			next: (users) => {
				this.dataSource.data = users;
			},
			error: (err) => {
				console.error('Error:', err);
			}
		});
	}
}
