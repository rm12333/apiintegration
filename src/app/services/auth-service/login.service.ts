import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = {
      userName: username,
      password: password
    };

    return this.http.post('http://localhost/api/auth/login', credentials);
  }
}
