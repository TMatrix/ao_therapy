import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationComponent } from './patient-registration.component';

describe('PatientRegistrationComponent', () => {
	let component: PatientRegistrationComponent;
	let fixture: ComponentFixture<PatientRegistrationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PatientRegistrationComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PatientRegistrationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
