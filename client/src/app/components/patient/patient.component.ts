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
	currentPatientId: string;
	patient: Patient;
	displayProfile: boolean;
	displayInitial: boolean;
	isInitSetted: boolean;

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
		this.currentPatientId = this.route.snapshot.paramMap.get('id');
		this.patientService
			.get({ id: this.currentPatientId })
			.subscribe(data => {
				const name = data.payload.name.split(' ');
				this.patient['firstname'] = name[0];
				this.patient['lastname'] = name[1];
				this.patient['age'] = data.payload.age;
				this.patient['case'] = data.payload.case;
				this.patient['department'] = data.payload.department;
				this.patient['sex'] = data.payload.sex;
			});
		this.isInitSetted = false;
		this.history = [
			{
				initial: {
					date: '22.9.2019',
					time: '12:23',
					taa: 130,
					lactate: 100,
					pyruvate: 80
				},
				second: {
					name: 'Cardioxipin',
					date: '22.9.2019',
					time: '12:43',
					taa: 140,
					lactate: 120,
					pyruvate: 90,
					isRecommended: true
				}
			},
			{
				initial: {
					date: '22.9.2019',
					time: '12:23',
					taa: 130,
					lactate: 100,
					pyruvate: 80
				},
				second: {
					name: 'Cardioxipin',
					date: '22.9.2019',
					time: '12:43',
					taa: 140,
					lactate: 120,
					pyruvate: 90,
					isRecommended: true
				}
			},
			{
				initial: {
					date: '22.9.2019',
					time: '12:23',
					taa: 130,
					lactate: 100,
					pyruvate: 80
				},
				second: {
					name: 'Cardioxipin',
					date: '22.9.2019',
					time: '12:43',
					taa: 140,
					lactate: 120,
					pyruvate: 90,
					isRecommended: true
				},
				third: {
					name: 'Cardioxipin',
					date: '22.9.2019',
					time: '12:43',
					taa: 140,
					lactate: 120,
					pyruvate: 90,
					isRecommended: true
				}
			}
		];
	}

	onShowProfile() {
		this.displayProfile = true;
	}

	onSetState(data) {
		this.displayInitial = true;
		switch (data) {
			case 'init':
				// Service to post init state to ao_operations table of DB
				// on success response set isInitSetted to 'true'
				break;
			case 'second':
				break;
			case 'third':
				break;
			default:
				break;
		}
	}

	onResetState() {
		this.isInitSetted = false;
	}

	isThirdPresented(item) {
		return Object.keys(item).includes('third');
	}
}
