import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/router/app-routing.module';
import { RouterModule } from '@app/router/router.module';
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/components/login/login.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { ButtonComponent } from '@app/shared/button/button.component';
import { SharedModule } from '@app/shared/shared.module';
import { InputComponent } from '@app/shared/input/input.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HeaderComponent,
		SidebarComponent,
		ButtonComponent,
		InputComponent
	],
	imports: [BrowserModule, AppRoutingModule, RouterModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
