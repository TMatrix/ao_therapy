import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FormService } from '@app/services/form.service';

import {
	requiredValidator,
	emailValidator,
	minLengthValidator,
	passwordValidator,
} from '@app/shared/form-validators';

import { Login } from '@app/models/login.model';
import {
	OptionalType,
	fieldsValidators
} from '@app/models/fields-validators.model';

@Injectable()
export class LoginService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	createLoginForm(): FormGroup {
		const initialValues: OptionalType<Login> = new Login();
		const validators: fieldsValidators<Login> = {
			email: [requiredValidator(), emailValidator()],
			password: [
				requiredValidator(),
				minLengthValidator('Minimum length of password is', 5),
				passwordValidator()
			]
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);

		return this.formBuilder.group(controls);
	}
}
