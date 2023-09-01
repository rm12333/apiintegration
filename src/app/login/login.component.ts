import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/auth-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordMinLength = 6; // Set the required minimum length for the password

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return; // If form is invalid, stop the login process
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.loginService.login(username, password).subscribe({
      next: (response: any) => {
        // Handle successful login response
        console.log('API Response:', response);
       // alert('successfully login');

        const token = response.data.token;
        const expirationTimestamp = response.data.expires; // Replace with the actual field name

        // Calculate expiration date by adding 24 hours (in milliseconds)
        const expirationDate = new Date(expirationTimestamp * 1000 + 24 * 60 * 60 * 1000);

        // Store token and expiration date in local storage
        localStorage.setItem('userToken', token);
        localStorage.setItem('tokenExpiration', expirationDate.toString());

        // Reset form fields after successful login
        this.loginForm.reset();

        this.router.navigate(['/profile']);
      },
      error: (error: any) => {
        console.log('Error occurred:', error);
       // alert('login failed, invalid crediantiols')
      },
    });
  }

  isTokenExpired(): boolean {
    const expirationString = localStorage.getItem('tokenExpiration');
    if (!expirationString) {
      return true; // Token expiration not set, treat as expired
    }

    const expirationDate = new Date(expirationString);
    return expirationDate <= new Date(); // Compare with current time
  }
}
