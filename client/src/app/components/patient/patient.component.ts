import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/models/patient.model';
import { Operation } from '@app/models/operation.model';
import { ActivatedRoute } from '@angular/router';
import { PatientDomainService as PatientService } from '@app/api/domains/patient-domain.service';
import { OperationDomainService as OperationService } from '@app/api/domains/operation-domain.service';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
	currentPatientId: string;
	patient: Patient;
	displayProfile: boolean;

	operationForm: FormGroup;
	lastOperation: Operation;

	initialState: Operation;
	secondState: Operation;
	thirdState: Operation;

	isInitSetted = false;
	isSecondSetted = false;
	isThirdSetted = false;

	displayStateDialogHeader: string;
	displayStateDialog: boolean;

	antioxydants: SelectItem[];
	enabledAO: string[];
	selectedAO: string;

	history: Operation[];

	constructor(
		private route: ActivatedRoute,
		private patientService: PatientService,
		private operationService: OperationService,
		private fb: FormBuilder
	) {
		this.patient = {} as Patient;
		this.antioxydants = [
			{ label: 'Cardioxipin', value: 'Cardioxipin' },
			{ label: 'Corvitin', value: 'Corvitin' },
			{ label: 'Mexidol', value: 'Mexidol' },
			{ label: 'Quercetin', value: 'Quercetin' }
		];
	}

	ngOnInit() {
		this.currentPatientId = this.route.snapshot.paramMap.get('id');
		this.patientService.get({ id: this.currentPatientId }).subscribe(
			data => {
				const name = data.payload.name.split(' ');
				this.patient['firstname'] = name[0];
				this.patient['lastname'] = name[1];
				this.patient['age'] = data.payload.age;
				this.patient['case'] = data.payload.case;
				this.patient['department'] = data.payload.department;
				this.patient['sex'] = data.payload.sex;
			},
			error => {
				//  console.log('Check your network.');
				// Handle error service
			}
		);

		this.operationService
			.get({ patient_id: this.currentPatientId })
			.subscribe(
				data => {
					this.history = data.payload;
					if (this.history.length) {
						this.setInitialState(this.history[0]);
					}
				},
				error => {
					this.history = [];
				}
			);

		this.operationForm = this.fb.group({
			taa: ['', [Validators.required]],
			lactate: ['', [Validators.required]],
			pyruvate: ['', [Validators.required]]
		});
	}

	private setInitialState(lastOperation: Operation): void {
		if (lastOperation.treatment === 1) {
			this.initialState = lastOperation;
			this.isInitSetted = true;
		} else if (
			lastOperation.isRecommended &&
			lastOperation.treatment === 2
		) {
			this.secondState = lastOperation;
			this.initialState = this.history[1];
			this.isInitSetted = true;
			this.isSecondSetted = true;
			this.selectedAO = this.secondState.name;
		} else if (
			lastOperation.isRecommended &&
			lastOperation.treatment === 3
		) {
			this.thirdState = lastOperation;
			this.secondState = this.history[1];
			this.initialState = this.history[2];
			this.isInitSetted = true;
			this.isSecondSetted = true;
			this.isThirdSetted = true;
			this.selectedAO = this.thirdState.name;
		} else {
			this.initialState = null;
			this.secondState = null;
			this.thirdState = null;
			this.isInitSetted = false;
			this.isSecondSetted = false;
			this.isThirdSetted = false;
		}
		this.getAO();
	}

	onShowProfile() {
		this.displayProfile = true;
	}

	onSaveStateDialog(keyWord) {
		this.displayStateDialog = true;
		switch (keyWord) {
			case 'init':
				this.displayStateDialogHeader = 'Initial State';
				break;
			case 'second':
				this.displayStateDialogHeader = '20 min State';
				break;
			case 'third':
				this.displayStateDialogHeader = '3 day State';
				break;
			default:
				break;
		}
	}

	onHideReset() {
		this.displayStateDialog = false;
		// this.displayStateDialogHeader = '';
		this.operationForm.reset();
	}

	onSaveState(formData) {
		switch (this.displayStateDialogHeader[0]) {
			case 'I' || '1':
				this.initialState = {
					patient_id: this.currentPatientId,
					date: new Date(),
					treatment: 1,
					...formData
				} as Operation;
				this.operationService
					.save({ operation: this.initialState })
					.subscribe(
						data => {
							if (data.isSuccess) {
								this.isInitSetted = true;
								this.getAO();
							}
						},
						error => {
							this.isInitSetted = false;
							// console.log('Failed on saving initial state');
						}
					);
				this.history.unshift(this.initialState);
				break;
			case '2':
				this.secondState = {
					patient_id: this.currentPatientId,
					date: new Date(),
					name: this.selectedAO,
					treatment: 2,
					...formData
				};
				if (this.isRecommended(this.initialState, this.secondState)) {
					this.secondState.isRecommended = true;
					this.isSecondSetted = true;
					this.operationService
						.save({ operation: this.secondState })
						.subscribe();
				} else {
					this.secondState.isRecommended = false;
					this.operationService
						.save({ operation: this.secondState })
						.subscribe(data => {
							if (data.isSuccess) {
								this.setInitialState(this.secondState);
							}
						});
				}
				this.history.unshift(this.secondState);
				break;
			case '3':
				this.thirdState = {
					patient_id: this.currentPatientId,
					date: new Date(),
					name: this.selectedAO,
					treatment: 3,
					...formData
				};
				if (this.isEffective(this.secondState, this.thirdState)) {
					this.thirdState.isRecommended = true;
					this.isThirdSetted = true;
					this.operationService
						.save({ operation: this.thirdState })
						.subscribe(data => {
							if (data.isSuccess) {
								// Show info 'Congratulations! The treatment is effective'
							}
						});
				} else {
					this.thirdState.isRecommended = false;
					this.operationService
						.save({ operation: this.thirdState })
						.subscribe(data => {
							if (data.isSuccess) {
								// Show info 'Unfortunatly, the treatment isn't effective/ Please, try another antyoxidant'
								this.setInitialState(this.thirdState);
							}
						});
				}
				this.history.unshift(this.thirdState);
				break;
			default:
				break;
		}
		this.onHideReset();
	}

	private getAO(): void {
		this.enabledAO = this.getEnabledAO();
		if (this.history[0].isRecommended) {
			this.selectedAO = this.history[0].name; // for last success treatment result from history
		} else if (this.enabledAO.length) {
			this.selectedAO = this.enabledAO[
				this.enabledAO.length === 1
					? 0
					: Math.floor(Math.random() * this.enabledAO.length)
			];
		} else {
			this.selectedAO = ''; // if all antyoxidant are inappropriate for current patient
		}
	}

	private getEnabledAO(): string[] {
		const buffer: string[] = this.antioxydants.map(el => el.value);
		this.history.forEach(el => {
			if (el.isRecommended === false && buffer.indexOf(el.name) >= 0) {
				buffer.splice(buffer.indexOf(el.name), 1);
			}
		});

		this.antioxydants = this.antioxydants.map(el => {
			if (!buffer.includes(el.value)) {
				return { ...el, disabled: true };
			}
			return el;
		});

		this.selectedAO = '';

		return buffer;
	}

	isRecommended(prev, next): boolean {
		const flagTaa = next.taa > prev.taa;
		const flagLactate = next.lactate < prev.lactate;
		const flagPyruvate = next.pyruvate > prev.pyruvate;
		return flagTaa && flagLactate && flagPyruvate;
	}

	isEffective(prev, next): boolean {
		const flagTaa = next.taa >= prev.taa;
		const flagLactate = next.lactate <= prev.lactate;
		const flagPyruvate = next.pyruvate >= prev.pyruvate;
		return flagTaa && flagLactate && flagPyruvate;
	}
}
