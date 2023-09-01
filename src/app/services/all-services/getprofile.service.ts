import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalyService } from '../global/globaly.service';



@Injectable({
  providedIn: 'root'
})
export class GetprofileService {

  private profileUrl = 'http://localhost:80/api/auth/profile';

  constructor(private http: HttpClient, private globalyservice: GlobalyService) { }

  getProfileData(): Observable<any> {

    const token = this.globalyservice.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.profileUrl, { headers });
  }
}
