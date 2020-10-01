import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  async getSession(): Promise<any> {
    return await this.httpClient
      .get(`${environment.apiUrl}/session`)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  setToken(token): void {
    return localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  handleError(error: HttpErrorResponse): any {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
