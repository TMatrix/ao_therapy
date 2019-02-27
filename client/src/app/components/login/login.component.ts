import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '@app/services/login.service';
// import { StoreService } from '@app/services/store.service';

import { Login as LoginModel } from '@app/models/login.model';
// import {
// 	Login as LoginAction,
// } from '@app/store/actions/user/user.actions';
// import { isUserLoading } from '@app/store/selectors/user.selectors';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;

	// isLoading = false;

	// private storeDisconnect: () => void;

	constructor(private loginService: LoginService) {} // private storeService: StoreService

	ngOnInit() {
		this.createForms();

		// this.storeDisconnect = this.storeService.connect([
		// 	{
		// 		subscriber: isLoading => {
		// 			this.isLoading = isLoading;
		// 		},
		// 		selector: isUserLoading()
		// 	}
		// ]);
	}

	private createForms() {
		this.loginForm = this.loginService.createLoginForm();
	}

	resetForms() {
		this.loginForm.reset();
	}

	onLogin(loginModel: LoginModel) {
		const user = this.trimStringFields<LoginModel>(loginModel);
		// this.storeService.dispatch(new LoginAction({ user }));
	}

	private trimStringFields<T>(obj: T): T {
		return Object.keys(obj).reduce(
			(trimmedObj, key) => {
				const isString = typeof obj[key] === 'string';
				trimmedObj[key] = isString ? obj[key].trim() : obj[key];
				return trimmedObj;
			},
			{} as T
		);
	}

	ngOnDestroy(): void {
		// this.storeDisconnect();
	}
}
