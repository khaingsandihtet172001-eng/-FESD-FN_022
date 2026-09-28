import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  submitted = false;
  alertType: 'success' | 'danger' | null = null;
  alertMessage = '';

  form = this.fb.nonNullable.group({
    userEmail: ['', [Validators.required, Validators.email, Validators.maxLength(85)]],
    userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    userFirstName: ['', [Validators.required, Validators.maxLength(50)]],
    userLastName: ['', [Validators.required, Validators.maxLength(50)]],
    userTel: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(50)]],
    dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]]
  });

  get f() { return this.form.controls; }

  submit(): void {
    this.submitted = true;
    this.alertType = null;
    this.alertMessage = '';

    if (this.form.invalid) {
      this.alertType = 'danger';
      this.alertMessage = 'Please correct the highlighted fields.';
      return;
    }

    const value = this.form.getRawValue();
    try {
      const user = new User(
        value.userEmail.trim(),
        value.userPassword,
        value.userFirstName.trim(),
        value.userLastName.trim(),
        value.userTel.trim(),
        value.dateOfBirth
      );
      user.getAge();

      const result = this.userService.register(user);
      if (result.status === 201) {
        this.alertType = 'success';
        this.alertMessage = `HTTP 201: ${result.message}`;
        this.form.reset();
        this.submitted = false;
      } else {
        this.alertType = 'danger';
        this.alertMessage = `HTTP ${result.status}: ${result.message}`;
      }
    } catch (error) {
      this.alertType = 'danger';
      this.alertMessage = 'HTTP 500: Server or script error.';
    }
  }
}
