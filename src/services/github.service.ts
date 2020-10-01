import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthService } from './auth.sevices';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private httpClient: HttpClient, public authService: AuthService) {
  }

  async getUser(username: string): Promise<any> {
    return await this.httpClient
      .get(`https://api.github.com/users/${username}`)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getReposPublic(username: string, perPage: number = 10): Promise<any> {
    return await this.httpClient
      .get(`https://api.github.com/users/${username}/repos?per_page=${perPage}`)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getReposStarred(username: string, perPage: number = 10): Promise<any> {
    return await this.httpClient
      .get(`https://api.github.com/users/${username}/starred?per_page=${perPage}`)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getAuthUser(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'bearer ' + this.authService.getToken()
      })
    };

    return await this.httpClient
      .get('https://api.github.com/user', httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getAuthReposPublic(perPage: number = 10): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'bearer ' + this.authService.getToken()
      })
    };

    return await this.httpClient
      .get(`https://api.github.com/user/repos?per_page=${perPage}`, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getAuthReposStarred(perPage: number = 10): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'bearer ' + this.authService.getToken()
      })
    };

    return await this.httpClient
      .get(`https://api.github.com/user/starred?per_page=${perPage}`, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
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
