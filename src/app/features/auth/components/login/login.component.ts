import { Component } from '@angular/core';
// Not standalone. Imported via AuthModule
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  // not standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error?: string;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = undefined;
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Identifiants invalides';
      }
    });
  }
}
