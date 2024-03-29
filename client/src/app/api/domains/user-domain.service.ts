import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { tap } from 'rxjs/operators';
import { TokenService } from '@app/services/token.service';
import { UserDomain } from '@app/models/user-domain.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { AuthenticatedUser, User } from '@app/models/user.model';
import { Login } from '@app/models/login.model';

@Injectable()
export class UserDomainService implements UserDomain {
	private userPath = 'api/user';
	constructor(
		private httpService: HttpService,
		private tokenService: TokenService
	) {}

	login(payload: Login): Observable<ResponseScheme<AuthenticatedUser>> {
		return this.httpService
			.makeRequest<ResponseScheme<AuthenticatedUser>>(
				new ServiceRequest(
					RequestType.POST,
					`${this.userPath}/login`,
					null,
					payload
				)
			)
			.pipe(
				tap(response => {
					this.httpService.authHeader = response.payload.token;
					this.tokenService.setToken(response.payload.token);
				})
			);
	}

	logout() {
		this.tokenService.removeToken();
	}

	get(payload: { id: string }): Observable<ResponseScheme<User>> {
		return this.httpService.makeRequest<ResponseScheme<User>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.userPath}/${payload.id}`
			)
		);
	}

	getAll(): Observable<ResponseScheme<User[]>> {
		return this.httpService.makeRequest<ResponseScheme<User[]>>(
			new ServiceRequest(RequestType.GET, this.userPath)
		);
	}

	verifyToken(payload: { token: string }): Observable<ResponseScheme<User>> {
		return this.httpService
			.makeRequest<ResponseScheme<User>>(
				new ServiceRequest(
					RequestType.POST,
					`${this.userPath}/verifyToken`,
					null,
					payload
				)
			)
			.pipe(
				tap(() => {
					this.httpService.authHeader = payload.token;
					this.tokenService.setToken(payload.token);
				})
			);
	}
}
