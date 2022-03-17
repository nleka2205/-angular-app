import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
      private authService: AuthService,
      private router: Router,
      private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }

  get emailAddress(){
    //console.log(this.loginForm.get('email'));
    return this.loginForm.get('email');
  }
  get password(){
    //console.log(this.loginForm.get('password'));
    return this.loginForm.get('password');
  }

  submit(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Loading...',
          error: 'An error occured during the authentication process. Please try again!'
        })
      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }

  }
}
