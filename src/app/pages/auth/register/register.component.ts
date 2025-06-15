import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.email , Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {}

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    return password && confirmPassword && password.value !== confirmPassword.value ? 
      { passwordMismatch: true } : null;
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registerForm.reset();
        this.isSubmitting = false;
        if (response.status == "success")
        this.successMessage = response?.message || 'Registration success';

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          const errors = err.error.errors;
          const messages = Object.values(errors).flat();
          this.errorMessage = messages.join('\n'); 
        } else {
          // Generic error
          this.errorMessage = err?.error?.message || 'Registration failed';
        }
      },
    });
  }
}
