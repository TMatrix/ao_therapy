import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { Patient } from '@app/models/patient.model';
import { ResponseScheme } from '@app/models/response-scheme.model';

@Injectable()
export class PatientDomainService {
	private patientPath = 'api/patient';
	constructor(private httpService: HttpService) {}

	register(payload: { patient: Patient }): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				`${this.patientPath}/`,
				null,
				payload
			)
		);
	}

	update(
		payload: { patient: Patient } & Patient
	): Observable<ResponseScheme<null>> {
		return this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.PUT,
				`${this.patientPath}/${payload.id}`,
				null,
				payload
			)
		);
	}

	delete(payload: { id: string }): Observable<ResponseScheme<null>> {
		return this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.DELETE,
				`${this.patientPath}/${payload.id}`,
				null,
				payload
			)
		);
	}

	get(payload: { id: string }): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.patientPath}/${payload.id}`
			)
		);
	}

	getAll(): Observable<ResponseScheme<Patient[]>> {
		return this.httpService.makeRequest<ResponseScheme<Patient[]>>(
			new ServiceRequest(RequestType.GET, this.patientPath)
		);
	}
}
