import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, {
      validators: passwordMatch()
    })

  constructor(    
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }
  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  submit(){
    if(this.signUpForm.valid){
      const name = this.signUpForm.get('name')?.value;
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;

      this.authService.signup(name, email, password).pipe(
        this.toast.observe({
          success: 'Account created successfully',
          loading: 'Loading...',
          error: ({message}) => `${message}`
        })
      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }

  }
}

export function passwordMatch(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const firstPassword = control.get('password')?.value;
    const secondPassword = control.get('confirmPassword')?.value;

    if( firstPassword && secondPassword && firstPassword !== secondPassword){
      return {
        passwordDontMatch: true
      }
    }
    return null;
  } 
}
