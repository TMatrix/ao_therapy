import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http.service';
import { PatientDomainService } from '@app/api/domains/patient-domain.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService, PatientDomainService]
})
export class APIModule {}
