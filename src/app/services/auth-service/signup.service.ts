import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(newUser: { userName: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:80/api/auth/register', newUser);
  }
}
 


