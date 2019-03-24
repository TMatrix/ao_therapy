import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http.service';
import { PatientDomainService } from '@app/api/domains/patient-domain.service';
import { OperationDomainService } from '@app/api/domains/operation-domain.service';
import { UserDomainService } from '@app/api/domains/user-domain.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [
		HttpService,
		PatientDomainService,
		OperationDomainService,
		UserDomainService
	]
})
export class APIModule {}
