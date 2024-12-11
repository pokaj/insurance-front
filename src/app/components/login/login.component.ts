import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  login() {
    this.spinner.show()
    this.authService.login(this.email, this.password).subscribe(response => {
      if(response.data){
        this.spinner.hide();
        this.authService.saveUser(response)
        this.router.navigate(['home']);
      }else {
        return
      }
    })
  }



}
