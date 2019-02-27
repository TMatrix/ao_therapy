import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientRegistrationComponent } from '@app/components/patient-registration/patient-registration.component';
import { LoginComponent } from '@app/components/login/login.component';
import { AppComponent } from '@app/app.component';
import { LoginAuthGuard } from '@app/services/guards/login-auth.guard';
import { AppAuthGuard } from '@app/services/guards/app-auth.guard';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
	{
		path: 'app',
		component: AppComponent,
		canActivate: [AppAuthGuard],
		children: [
			// { path: '', component: HomeComponent},
			{
				path: 'patient-registration',
				component: PatientRegistrationComponent
			}
			// { path: 'patient', component: PatientComponent},
			// { path: 'patient-list', component: PatientListComponent },
		]
	},
	{
		path: '**',
		redirectTo: 'app'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
