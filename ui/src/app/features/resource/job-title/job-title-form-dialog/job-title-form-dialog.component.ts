import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { JobTitle } from "@openapi/model/jobTitle";
import { JobTitleService } from "@openapi/api/jobTitle.service";
import { MatIcon } from "@angular/material/icon";
import { DialogWrappedInfo, DialogWrappedService } from "@app/shared/components/dialog-wrapped/dialog-wrapped.service";

@Component({
	selector: 'app-job-title-form-dialog',
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatRadioModule,
		MatDialogModule,
		MatIcon
	],
	templateUrl: './job-title-form-dialog.component.html',
	styleUrl: './job-title-form-dialog.component.scss'
})
export class JobTitleFormDialogComponent implements OnInit {

	form!: FormGroup;

	constructor(
		private readonly jobTitleService: JobTitleService,
		private readonly dialogWrapped: DialogWrappedService,
		private readonly dialogRef: MatDialogRef<JobTitleFormDialogComponent>,
		private readonly formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: JobTitle,
	) {
		this.buildFormGroup();
	}

	ngOnInit(): void {
		this.form?.patchValue(this.data);
	}

	onSubmit(): void {
		this.validateForm()
		if (this.data && this.data.id) {
			this.edit();
		} else {
			this.create();
		}

		if (this.data) {

		}
	}

	private create(): void {
		this.jobTitleService.addJobTitle(this.form.value).subscribe({
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

		this.jobTitleService.updateJobTitle(request).subscribe({
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
			description: ['', Validators.required]
		});
	}

}
