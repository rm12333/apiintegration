import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { User } from '../usermodel';
import { GetprofileService } from '../services/all-services/getprofile.service';
import { UpdateprofileService } from '../services/all-services/updateprofile.service';


@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent {
  updatForm: RxFormGroup; // Use RxFormGroup
  user: User;
  profileData: any;

  submitted = false; 
  

  constructor(private formBuilder: FormBuilder,
     private rxFormBuilder: RxFormBuilder,
     private getProfileService: GetprofileService,  // Inject the GetprofileService
     private updateProfileService: UpdateprofileService,

      private http: HttpClient) {
    this.user = new User();
    this.updatForm = <RxFormGroup>this.rxFormBuilder.formGroup(this.user); // Use RxFormBuilder
  }

  ngOnInit(): void {
    this.fetchProfile();
    let user = new User();
    
  }

  fetchProfile(): void {
    this.getProfileService.getProfileData().subscribe({
      next:(response: any) => {
      this.profileData = response;
      this.updatForm.patchValue(this.profileData.data); // Update form values with fetched data
     
    },
    error:(error) => {
      console.error('An error occurred:', error);
    },
    complete: () => {
      // define on request complete logic
      // 'complete' is not the same as 'finalize'!!
      // this logic will not be executed if error is fired
    },
  })
  }

  userupdate(formData: any) {
    this.submitted = true; 
    
    if (this.updatForm.valid) {
      const modifiedData = {
        firstNameFurigana: formData.firstNameFurigana,
        firstNameKanji: formData.firstNameKanji,
        lastNameFurigana: formData.lastNameFurigana,
        lastNameKanji: formData.lastNameKanji,
        profileImage: formData.profileImage
      };

      this.updateProfileService.updateUserProfile(modifiedData).subscribe({

        next:(response: any) => {
          console.log('Profile Data Updated:', response);
          this.fetchProfile();
          // window.location.reload();
        },
        error:(error: any) => {
          console.error('Error updating profile:', error);
        },
        complete: () => {
          // define on request complete logic
          // 'complete' is not the same as 'finalize'!!
          // this logic will not be executed if error is fired
        },
       } )
    }
  }
}
