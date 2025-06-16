import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loading:boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // initialize the objects
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email , Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    })
  }

  ngOnInit(): void {
    
  }

  getControl(controlName: string): FormControl {
      return this.loginForm.get(controlName) as FormControl;   
  }

  // submit the login form
  onSubmit(): void {
    this.errorMessage = '';

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Loggin successful:', response);
        this.loginForm.reset();
        this.loading = false;
        if (response.status == "success")
        this.successMessage = response?.message || 'Login success';

        this.router.navigate(['/dashboard']);

      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          this.handleValidationErrors(err.error.errors);
          this.loading = false;
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Login failed';
          this.loading = false;
        }
      },
    });
  }

  // Laravel validation errors
  handleValidationErrors(errors: { [key: string]: string[] }) {
    Object.keys(errors).forEach((field) => {
      const control = this.loginForm.get(field);
      if (control) {
        control.setErrors({ server: errors[field][0] }); 
      }
    });
  }

}
