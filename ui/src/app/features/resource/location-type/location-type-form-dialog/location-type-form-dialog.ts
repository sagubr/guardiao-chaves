import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersService } from "@openapi/api/users.service";
import { UserDto } from "@openapi/model/userDto";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatChipsModule } from "@angular/material/chips";
import { LocationTypeService } from "@openapi/api/locationType.service";
import { DialogWrappedInfo, DialogWrappedService } from "@app/shared/components/dialog-wrapped/dialog-wrapped.service";
import { LocationType } from "@openapi/model/locationType";

@Component({
  selector: 'app-location-type-form-dialog',
  standalone: true,
	imports: [
		CommonModule,
		MatSelectModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatRadioModule,
		ReactiveFormsModule,
		ClipboardModule,
		MatDialogModule,
		MatChipsModule,
	],
  templateUrl: './location-type-form-dialog.html',
  styleUrl: './location-type-form-dialog.scss'
})
export class LocationTypeFormDialog implements OnInit {

	form!: FormGroup;

	constructor(
		private readonly dialogWrapped: DialogWrappedService,
		private readonly dialogRef: MatDialogRef<LocationTypeFormDialog>,
		private readonly locationTypeService: LocationTypeService,
		private readonly formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: LocationType,
	) {
		this.buildFormGroup();
	}

	ngOnInit(): void {
		this.form.patchValue(this.data);
	}

	onSubmit(): void {
		this.validateForm()
		if (this.data && this.data.id) {
			this.edit();
		} else {
			this.create();
		}
	}

	private create(): void {
		this.locationTypeService.createLocationType(this.form.value).subscribe({
			next: () => {
				this.form.reset();
				this.dialogRef.close(true);
				this.dialogWrapped.openFeedback(
					{
						title: 'Salvo com sucesso',
						message: ``,
						icon: "success"
					} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
			},
			error: (err: any) => {
				console.error(err);
				this.dialogWrapped.openFeedback(
					{
						title: 'Não foi possível concluir o registro',
						message: ``,
						icon: "warning"
					} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
			},
		});
	}

	private edit(): void {

		const request = {
			...this.form.value,
			id: this.data.id
		}

		this.locationTypeService.updateLocationType(request).subscribe({
			next: () => {
				this.form.reset();
				this.dialogRef.close(true);
				this.dialogWrapped.openFeedback(
					{
						title: 'Salvo com sucesso',
						message: ``,
						icon: "success"
					} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
			},
			error: (err: any) => {
				console.error(err);
				this.dialogWrapped.openFeedback(
					{
						title: 'Não foi possível concluir o registro',
						message: ``,
						icon: "warning"
					} as DialogWrappedInfo).afterClosed().subscribe(res => console.log(res));
			},
		});
	}

	private validateForm(): void {
		if (this.form.valid) {
			return;
		}
		this.form.markAllAsTouched();
		throw new Error();
	}

	private buildFormGroup(): void {
		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['']
		});
	}

}
