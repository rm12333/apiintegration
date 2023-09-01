import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalyService {

  // constructor() { }
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

}