import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

export class ConnectedUser {
  constructor(
    public id: number,
    public email: string,
  ) {}
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    const connectedUser = localStorage.getItem(CONSTANTES.connectedUser);
    if (connectedUser) {
      this.#user$.next(JSON.parse(connectedUser));
    }
  }
  // user$ => user si authentifié, null sinon
  #user$ = new BehaviorSubject<ConnectedUser | null>(null);
  user$ = this.#user$.asObservable();
  // isLoggedIn$ => true si authentifié false sinon
  isLoggedIn$: Observable<boolean> = this.#user$.pipe(map((user) => !!user));
  // isLoggedOut$ => false si authentifié true sinon
  isLoggedOut$: Observable<boolean> = this.#user$.pipe(map((user) => !user));
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // eli thabou ama rani ma nbadelch le flux
        const connectedUser: ConnectedUser = new ConnectedUser(response.userId, credentials.email)
        this.#user$.next(connectedUser);
        localStorage.setItem(CONSTANTES.connectedUser, JSON.stringify(connectedUser));
        this.saveToken(response.id);
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.#user$.next(null);
    localStorage.removeItem(CONSTANTES.connectedUser);
    this.removeToken();
  }

  saveToken(token: string) {
    localStorage.setItem(CONSTANTES.authToken, token);
  }

  getToken(): string {
    return localStorage.getItem(CONSTANTES.authToken) ?? '';
  }

  removeToken() {
    localStorage.removeItem(CONSTANTES.authToken);
  }
}
