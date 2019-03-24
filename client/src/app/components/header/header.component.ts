import { Component } from '@angular/core';
import { UserDomainService } from '@app/api/domains/user-domain.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(private userService: UserDomainService) {}

	logout() {
		this.userService.logout();
	}
}
