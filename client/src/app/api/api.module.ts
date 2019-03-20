import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http.service';
import { PatientDomainService } from '@app/api/domains/patient-domain.service';
import { OperationDomainService } from '@app/api/domains/operation-domain.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService, PatientDomainService, OperationDomainService]
})
export class APIModule {}
