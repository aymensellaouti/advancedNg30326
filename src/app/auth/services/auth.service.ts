import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // user$ => user si authentifié, null sinon
  // isLoggedIn$ => true si authentifié false sinon
  // isLoggedOut$ => false si authentifié true sinon
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // eli thabou ama rani ma nbadelch le flux
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
