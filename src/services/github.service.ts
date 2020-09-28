import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private httpClient: HttpClient) {
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

  async getRepos(username: string, perPage: number = 10): Promise<any> {
    return await this.httpClient
      .get(`https://api.github.com/users/${username}/repos?per_page=${perPage}`)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
      .toPromise();
  }

  async getStarred(username: string, perPage: number = 10): Promise<any> {
    return await this.httpClient
      .get(`https://api.github.com/users/${username}/starred?per_page=${perPage}`)
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
