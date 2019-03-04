import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { PatientDomainService as PatientService } from '@app/api/domains/patient-domain.service';
import { SelectItem } from 'primeng/api';

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
	currentPatient: string;
	patient: Patient;

	antioxydants: SelectItem[];
	selectedAO: string;

	history: any[];

	constructor(
		private route: ActivatedRoute,
		private patientService: PatientService
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
		this.currentPatient = this.route.snapshot.paramMap.get('id');
		this.patientService.get({ id: this.currentPatient }).subscribe(data => {
			const name = data.payload.name.split(' ');
			this.patient['firstname'] = name[0];
			this.patient['lastname'] = name[1];
			this.patient['age'] = data.payload.age;
			this.patient['case'] = data.payload.case;
			this.patient['department'] = data.payload.department;
			this.patient['sex'] = data.payload.sex;
		});

		this.history = [
			{
				initial: {
					name: '',
					date: '',
					time: '',
					taa: 0,
					lactate: 0,
					pyruvate: 0
				},
				second: {
					name: '',
					date: '',
					time: '',
					taa: 0,
					lactate: 0,
					pyruvate: 0
				}
			}
		];
	}
}
