import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/auth-service/signup.service'; // Make sure to import the service

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  newUsernameControl: AbstractControl | null; 

  constructor(private signupService: SignupService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      newUsername: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.newUsernameControl = this.signupForm.get('newUsername');
  }

  signup() {
    if (this.signupForm.valid) {
      const newUser = {
        userName: this.signupForm.value.newUsername,
        password: this.signupForm.value.newPassword
      };

      this.signupService.signup(newUser).subscribe({
        next:(response: any) => {
          console.log(response);
          this.signupForm.reset();

          this.router.navigate(['/login']); // Navigate to login
          // Store user token in local storage (if needed)
          // Handle success (if needed)
        },
        error:error => {
          console.error('Signup failed:', error);
          if (error.error) {
            console.log('Server response:', error.error);
          }
          // Handle failure (if needed)
        },
        complete: () => {
          // define on request complete logic
          // 'complete' is not the same as 'finalize'!!
          // this logic will not be executed if error is fired
        },
       } );
    }
  }

  isControlTouchedAndHasError(control: AbstractControl | null, errorName: string): boolean {
    return !!control?.touched && !!control?.hasError(errorName);
  }
}
