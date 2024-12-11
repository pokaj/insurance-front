import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgxSpinnerComponent, NgxSpinnerService} from "ngx-spinner";
import {Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgxSpinnerComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = "";
  email = "";
  password = "";
  password_confirmation = "";

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  register(): any {
    this.spinner.show();
    if (this.email == "" || this.email == "" || this.password == "" || this.password_confirmation == "") {
      this.spinner.hide()
      return this.notificationService.showNotification({
        status: 'error',
        title: 'Error',
        text: 'You have empty fields',
        autoclose: false,
      })
    }

    if (this.password !== this.password_confirmation) {
      this.spinner.hide()
      return this.notificationService.showNotification({
        status: 'error',
        title: 'Error',
        text: 'Your passwords do not match',
        autoclose: false,
      })
    }

    this.authService.register(this.name, this.email, this.password, this.password_confirmation).subscribe(response => {
      this.authService.saveUser(response)
      this.spinner.hide();
      this.router.navigate(['home']);
    })
  }
}
