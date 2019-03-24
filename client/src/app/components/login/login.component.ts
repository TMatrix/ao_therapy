import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '@app/services/login.service';
import { Login as LoginModel } from '@app/models/login.model';
import { UserDomainService } from '@app/api/domains/user-domain.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	// isLoading = false;

	constructor(
		private loginService: LoginService,
		private userService: UserDomainService,
		private route: Router
	) {}

	ngOnInit() {
		this.createForms();
	}

	private createForms() {
		this.loginForm = this.loginService.createLoginForm();
	}

	resetForms() {
		this.loginForm.reset();
	}

	onLogin(loginModel: LoginModel) {
		const user = this.trimStringFields<LoginModel>(loginModel);
		this.userService.login(user).subscribe(data => {
			if (data.isSuccess) {
				this.route.navigate(['/app/home']);
			}
		});
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
}
