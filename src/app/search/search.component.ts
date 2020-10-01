import { Component, ElementRef } from '@angular/core';

import { GithubService } from '../../services/github.service.js';

@Component({
  selector   : 'app-search',
  templateUrl: './search.component.html',
  styleUrls  : ['./search.component.scss']
})
export class SearchComponent {
  username     = null;
  user         = {};
  repositories = {
    public : [],
    starred: [],
  };
  isSearch     = false;
  isError      = null;
  required     = null;

  constructor(public githubService: GithubService, public el: ElementRef) {
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    this.user         = {};
    this.repositories = {
      public : [],
      starred: [],
    };
    this.isSearch     = false;
    this.isError      = null;
    this.required     = null;
  }

  async handlerSearch(): Promise<any> {
    this.setDefaultValues();

    if (!this.username) {
      this.required = 'Digite o username.';
      this.el.nativeElement.querySelector('.input-username').focus();
    } else {
      this.username = this.username.toLowerCase();

      try {
        this.user         = await this.githubService.getUser(this.username) as object;
        this.repositories = {
          public : await this.githubService.getReposPublic(this.username) as object[],
          starred: await this.githubService.getReposStarred(this.username) as object[],
        };
        this.isSearch     = true;
      } catch (e) {
        this.isError = true;

        console.log('error:', e);
      }
    }
  }

  handlerSearchInput(event: any): any {
    this.setDefaultValues();

    if (event.keyCode === 13) {
      this.handlerSearch();
    }
  }
}
