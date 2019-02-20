import { NgModule } from '@angular/core';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { TokenService } from '@app/services/token.service';

@NgModule({
	providers: [
		FormService,
		LoginService,
		TokenService
	]
})
export class ServiceModule {}
