import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientRegistrationComponent } from '@app/components/patient-registration/patient-registration.component';

const appRoutes: Routes = [
	{ path: 'patient-registration', component: PatientRegistrationComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
