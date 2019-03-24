import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '../token.service';
import { UserDomainService } from '@app/api/domains/user-domain.service';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private tokenService: TokenService,
		private userService: UserDomainService
	) {}
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		const currentToken = this.tokenService.getToken();
		if (currentToken) {
			return this.userService.verifyToken({ token: currentToken }).pipe(
				map(data => {
					if (data.isSuccess) {
						this.router.navigate(['/app/home']);
						return false;
					}
					return true;
				})
			);
		} else {
			return true;
		}
	}
}
