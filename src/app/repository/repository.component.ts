import { Component, Inject } from '@angular/core';

import { SearchComponent } from '../search/search.component';

@Component({
  selector   : 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls  : ['./repository.component.scss']
})
export class RepositoryComponent {
  reposPublic  = [];
  reposStarred = [];

  constructor(
    @Inject(SearchComponent) public parent: SearchComponent
  ) {
  }

  async handlerToggleType(type): Promise<any> {
    this.parent.type = type;

    if (type === 'starred') {
      if (!this.reposStarred.length) {
        this.reposStarred = await this.parent.githubService.getStarred(this.parent.username) as object[];
      }

      this.parent.repos = this.reposStarred;
    } else {
      if (!this.reposPublic.length) {
        this.reposPublic = await this.parent.githubService.getRepos(this.parent.username) as object[];
      }

      this.parent.repos = this.reposPublic;
    }
  }
}
