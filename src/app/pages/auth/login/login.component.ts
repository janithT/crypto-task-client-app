import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  isSubmitting = false;
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

  getControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  // submit the login form
  onSubmit(): void {
    this.errorMessage = '';
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Loggin successful:', response);
        this.loginForm.reset();
        this.isSubmitting = false;
        if (response.status == "success")
        this.successMessage = response?.message || 'Login success';

        this.router.navigate(['/dashboard']);

        // this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          const errors = err.error.errors;
          const messages = Object.values(errors).flat();
          this.errorMessage = messages.join('\n'); 
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Login failed';
        }
      },
    });
  }
}
