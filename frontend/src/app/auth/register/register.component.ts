import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService, RegisterRequest } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.valid) {
      this.authService.register(this.form.value as RegisterRequest).subscribe({
        next: () => {
          this.authService
            .login({
              email: this.form.value.email!,
              password: this.form.value.password!
            })
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'User Register Successfully.'
                });
                this.router.navigate(['/dashboard']);
              }
            });
        },
        error: (err) =>
          this.messageService.add({
            severity: 'error',
            summary: err.error.message || 'Registration failed'
          })
      });
    }
  }
}
