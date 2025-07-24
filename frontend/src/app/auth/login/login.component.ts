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
import { AuthService, LoginRequest } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value as LoginRequest).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successfully.',
            life: 3000
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => alert(err.error.message || 'Login failed')
      });
    }
  }
}
