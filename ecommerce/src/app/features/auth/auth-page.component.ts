// auth-page.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  activeTab: 'signin' | 'register' = 'signin';

  // Sign In Form
  signInForm: FormGroup;

  // Register Form
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Sign In Form
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Register Form with custom validator for password match
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^(0|(\+94))7[01245678]\d{7}$/)],
        ],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator: password match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password && confirm && password.value !== confirm.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  setTab(tab: 'signin' | 'register') {
    this.activeTab = tab;
    // Reset forms when switching tabs
    if (tab === 'signin') {
      this.registerForm.reset();
    } else {
      this.signInForm.reset();
    }
  }

  onSignIn() {
    if (this.signInForm.valid) {
      console.log('Sign In Data:', this.signInForm.value);
      alert('Sign in successful (demo)');
      // Add your sign-in logic here
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);
      alert('Account created successfully (demo)');
      // Add your registration logic here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // Forgot password handler
  onForgotPassword() {
    // Just a placeholder - no navigation for now
    console.log('Forgot password clicked');
    alert('Password reset link will be sent to your email (demo)');
  }
}