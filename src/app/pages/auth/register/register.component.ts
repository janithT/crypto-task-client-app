import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // initialize the objects
  constructor(private fb: FormBuilder, private authService: AuthService, 
    private router: Router, 
    private notificationService: NotificationService) {

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

  // password match validator
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    return password && confirmPassword && password.value !== confirmPassword.value ? 
      { passwordMismatch: true } : null;
  }

  // get controller names
  getControl(controlName: string): FormControl {
    const control = this.registerForm.get(controlName) as FormControl;

    if (controlName === 'password_confirmation' && this.registerForm.errors?.['passwordMismatch']) {
      control.setErrors({ ...control.errors, passwordMismatch: true });
    }

    return control;
  }

  // submit the registration form
  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registerForm.reset();
        this.loading = false;
        if (response.status == "success")
        this.notificationService.show(response?.message || 'Registration success' , 'success');

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err?.error?.errors) {
          // Laravel validation errors
          this.handleValidationErrors(err.error.errors);
          this.loading = false;
        } else {
          // Generic error
          this.notificationService.show(err?.error?.message || 'Registration failed. Try again' , 'error');
          this.loading = false;
        }
      },
    });
  }

  // Laravel validation errors
  handleValidationErrors(errors: { [key: string]: string[] }) {
    Object.keys(errors).forEach((field) => {
      const control = this.registerForm.get(field);
      if (control) {
        const errorMessages = errors[field];
        control.setErrors({
          server: errorMessages,
        });
      }
    });
  }
}
