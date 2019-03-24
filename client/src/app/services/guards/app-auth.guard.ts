import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '@app/services/token.service';
import { map } from 'rxjs/operators';
import { UserDomainService } from '@app/api/domains/user-domain.service';

@Injectable({
	providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private tokenService: TokenService,
		private userService: UserDomainService
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const currentToken = this.tokenService.getToken();
		if (currentToken) {
			return this.userService.verifyToken({ token: currentToken }).pipe(
				map(data => {
					if (data.isSuccess) {
						return true;
					}
					this.router.navigate(['/login'], {
						queryParams: { returnUrl: state.url }
					});
					return false;
				})
			);
		} else {
			this.router.navigate(['/login'], {
				queryParams: { returnUrl: state.url }
			});
			return false;
		}
	}
}
