import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ButtonModule,
		InputTextModule,
		RadioButtonModule,
		CalendarModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ProgressSpinnerModule,
		TableModule,
		DropdownModule
	],
	exports: [
		ButtonModule,
		InputTextModule,
		RadioButtonModule,
		CalendarModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ProgressSpinnerModule,
		TableModule,
		DropdownModule
	]
})
export class SharedModule {}
