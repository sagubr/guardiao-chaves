import {
	booleanAttribute,
	Component,
	effect,
	forwardRef,
	input,
	InputSignal,
	OnChanges,
	OnDestroy,
	OnInit,
	output,
	OutputEmitterRef,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import {
	ControlValueAccessor,
	FormControl,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	Validators
} from "@angular/forms";
import { MatOption, MatOptionModule } from "@angular/material/core";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgClass } from "@angular/common";
import { compareById } from "@app/core/utils/utils";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
	selector: 'app-select-wrapped',
	imports: [
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatCheckboxModule,
		NgClass
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectWrappedComponent),
			multi: true,
		},
	],
	templateUrl: './select-wrapped.component.html',
	styleUrl: './select-wrapped.component.scss',
})
export class SelectWrappedComponent<T> implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {

	@ViewChild('mySelect') mySelect!: MatSelect;

	readonly hint: InputSignal<string | undefined> = input<string>();
	readonly multiple = input(false, { transform: booleanAttribute });
	readonly placeholder: InputSignal<string> = input.required<string>();
	readonly isLoading = input(false, { transform: booleanAttribute });
	readonly options: InputSignal<T[]> = input.required<T[]>();
	readonly displayFn = input<(option: T) => string>(
		(option) => (option ? option.toString() : '')
	);
	readonly change: OutputEmitterRef<T> = output<T>();

	compareById: (o1: any, o2: any) => boolean = compareById;

	searchTerm: string = '';
	filteredOptions: T[] = [];
	selectedOptions: T[] = [];
	allSelected = false;

	selected = new FormControl<T | null>(null, [Validators.required]);

	private onChange: (value: T | null) => void = () => {
	};

	private onTouched: () => void = () => {
	};

	constructor() {
		effect(() => {
			this.filteredOptions = this.options();
			this.filterOptions();
		});
	}

	ngOnInit(): void {
		if (this.selected.value) {
			this.selected.setValue(this.selected.value, { emitEvent: true });
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['options'] && !changes['options'].firstChange) {
			if (this.selectedOptions.length > 0) {
				this.selectedOptions = this.selectedOptions
					.map((option) =>
						this.options().find(o => this.compareById(o, option)) || option);
			}
		}
	}

	ngOnDestroy(): void {
	}

	toggleAllSelection() {
		this.allSelected = !this.allSelected;
		this.allSelected ? this.mySelect.options.forEach((item: MatOption) => item.select())
			: this.mySelect.options.forEach((item: MatOption) => item.deselect())
	}

	writeValue(value: T[] | null): void {
		if (value) {
			this.selectedOptions = value;
		}
	}

	selectOption(option: T | null): void {
		if (option) {
			this.selected.setValue(option);
			this.onChange(option);
			this.change.emit(option);
		}
	}

	registerOnChange(fn: (value: T | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.selected.disable() : this.selected.enable();
	}

	getErrorMessage(): string {
		return this.selected.hasError('required') ? 'Este campo é obrigatório' : '';
	}

	filterOptions(): void {
		const search = this.searchTerm.toLowerCase();
		this.filteredOptions = this.options().filter((option) =>
			this.displayFn()(option).toLowerCase().includes(search)
		);
	}

	clearTerm(): void{
		this.searchTerm = '';
		this.filterOptions();
	}

}
