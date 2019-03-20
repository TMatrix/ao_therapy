import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { Operation } from '@app/models/operation.model';
import { ResponseScheme } from '@app/models/response-scheme.model';

@Injectable()
export class OperationDomainService {
	private operationPath = 'api/operation';
	constructor(private httpService: HttpService) {}

	save(payload: { operation: Operation }): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				`${this.operationPath}/`,
				null,
				payload
			)
		);
	}

	// update(
	// 	payload: { operation: Operation } & Operation
	// ): Observable<ResponseScheme<null>> {
	// 	return this.httpService.makeRequest<ResponseScheme<null>>(
	// 		new ServiceRequest(
	// 			RequestType.PUT,
	// 			`${this.operationPath}/${payload.id}`,
	// 			null,
	// 			payload
	// 		)
	// 	);
	// }

	// delete(payload: { id: string }): Observable<ResponseScheme<null>> {
	// 	return this.httpService.makeRequest<ResponseScheme<null>>(
	// 		new ServiceRequest(
	// 			RequestType.DELETE,
	// 			`${this.operationPath}/${payload.id}`,
	// 			null,
	// 			payload
	// 		)
	// 	);
	// }

	get(payload: { patient_id: string }): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.operationPath}/${payload.patient_id}`
			)
		);
	}

	getAll(): Observable<ResponseScheme<Operation[]>> {
		return this.httpService.makeRequest<ResponseScheme<Operation[]>>(
			new ServiceRequest(RequestType.GET, this.operationPath)
		);
	}
}
