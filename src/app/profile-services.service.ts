import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    // Make an HTTP GET request to fetch user profile data
    return this.http.get('http://localhost/api/auth/profile');
    
  }
}
