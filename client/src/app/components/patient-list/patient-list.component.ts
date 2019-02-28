import { Component, OnInit } from '@angular/core';
import { PatientDomainService as PatientService } from '@app/api/domains/patient-domain.service';
import { Patient } from '@app/models/patient.model';

@Component({
	selector: 'app-patient-list',
	templateUrl: './patient-list.component.html',
	styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
	cols: any[];
	patients: Patient[];

	constructor(private patientService: PatientService) {}

	ngOnInit() {
		this.patientService.getAll().subscribe(data => {
			this.patients = data.payload;
		});

		this.cols = [
			{ field: 'id', header: 'No' },
			{ field: 'name', header: 'Patient\'s name' },
			{ field: 'case', header: 'Case No' },
			{ field: 'date', header: 'Registration date' }
		];
	}

	onRowSelect(event) {
		// console.log(event.data.id);
		// go to patient page with selected :id
	}
}
