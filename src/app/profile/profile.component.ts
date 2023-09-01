import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { User } from '../usermodel';
import { GetprofileService } from '../services/all-services/getprofile.service';
import { UpdateprofileService } from '../services/all-services/updateprofile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updatForm: FormGroup;

  user: User;
  profileData: any;

  constructor(
    private formBuilder: RxFormBuilder,
    private http: HttpClient,
    private router: Router,
    private getProfileService: GetprofileService, 
    // Inject the GetprofileService
    private updateProfileService: UpdateprofileService) {
    this.user = new User()
    this.updatForm = this.formBuilder.formGroup(this.user);
  }

  ngOnInit(): void {
    this.fetchProfile();
    let user = new User();
   




  }

  fetchProfile(): void {
    this.getProfileService.getProfileData().subscribe({
      next: (response: any) => {
        this.profileData = response;
        this.updatForm.patchValue(this.profileData.data); // Update form values with fetched data
        
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        // define on request complete logic
        // 'complete' is not the same as 'finalize'!!
        // this logic will not be executed if error is fired
      },
    })
  }

  userupdate() {

    const modifiedData: any = {};
    console.log({ THE_USER_OBJECT: this.user });

    for (const property in this.user) {
      if (this.updatForm.value[property]) {
        modifiedData[property] = this.updatForm.value[property];
      }
    }

    this.updateProfileService.updateUserProfile(modifiedData).subscribe({

      next: (response: any) => {
        console.log('Profile Data Updated:', response);
        this.fetchProfile();
        // window.location.reload();
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);

        if (error.status === 500) {
          // alert('Token has expired. Please log in again.');
          this.router.navigate(['/login']);
        }
      },
      
    })
  }


}
