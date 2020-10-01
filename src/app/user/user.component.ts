import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.sevices';
import { GithubService } from '../../services/github.service';

@Component({
  selector   : 'app-user',
  templateUrl: './user.component.html',
  styleUrls  : ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user         = {};
  repositories = {
    public : [],
    starred: [],
  };
  error        = null;

  constructor(public authService: AuthService, public githubService: GithubService) {
  }

  async ngOnInit(): Promise<any> {
    const session = await this.authService.getSession();

    if (!session || !session.access_token) {
      this.error = 'Falha na autenticação, tente novamente.';
    } else {
      this.authService.setToken(session.access_token);

      this.user         = await this.githubService.getAuthUser() as object;
      this.repositories = {
        public : await this.githubService.getAuthReposPublic() as object[],
        starred: await this.githubService.getAuthReposStarred() as object[],
      };
    }
  }
}
