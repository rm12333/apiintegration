import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalyService } from '../global/globaly.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateprofileService {

  constructor(private http: HttpClient, private globalyservice: GlobalyService) { }

  updateUserProfile(modifiedData: any): Observable<any> {
    const token = this.globalyservice.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const profileUrl = 'http://localhost:80/api/auth/profile';

    return this.http.put(profileUrl, modifiedData, { headers });

  }
}
