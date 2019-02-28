import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientDomainService } from '@app/api/domains/patient-domain.service';
import { Patient as PatientModel } from '@app/models/patient.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-patient-registration',
	templateUrl: './patient-registration.component.html',
	styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit, OnDestroy {
	patientForm: FormGroup;
	submitted: boolean;
	patients: Observable<any>;
	isLoading: boolean;

	constructor(
		private fb: FormBuilder,
		private patientService: PatientDomainService
	) {}

	ngOnInit() {
		this.patientForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.maxLength(15)]],
			lastname: ['', [Validators.required, Validators.maxLength(15)]],
			age: [
				'',
				[Validators.required, Validators.max(150), Validators.min(0)]
			],
			sex: ['', Validators.required],
			case: ['', [Validators.required, Validators.min(0)]],
			department: ['', Validators.required],
			date: ['', Validators.required]
		});
		this.isLoading = false;
	}

	onSubmit(patientModel: PatientModel) {
		this.isLoading = true;
		const patient = Object.keys(patientModel).reduce(
			(patientObj, key) => {
				if (
					(key === 'firstname' || key === 'lastname') &&
					patientObj['name'] !== null
				) {
					patientObj['name'] =
						patientModel['firstname'] +
						' ' +
						patientModel['lastname'];
				} else if (key === 'date') {
					const date = new Date(patientModel[key]);
					patientObj[key] = `${date.getDate()}.${date.getMonth() +
						1}.${date.getFullYear()}`;
				} else {
					patientObj[key] = patientModel[key];
				}
				return patientObj;
			},
			{} as any
		);

		this.patientService.register(patient).subscribe(
			data => {
				if (data.isSuccess === true) {
					this.patientForm.reset();
				}
			},
			error => {
				this.isLoading = false;
			},
			() => {
				this.isLoading = false;
			}
		);
	}

	ngOnDestroy() {
		this.patientForm.reset();
	}
}
