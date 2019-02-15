import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ButtonModule,
		InputTextModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
