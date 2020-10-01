import { Component, Input } from '@angular/core';

@Component({
  selector   : 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls  : ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input()
  set repositories(value: any) {
    this.cache = value;
    this.repos = value.public;
  }

  type  = 'public';
  cache = {};
  repos = [];

  handlerToggleType(type: string): any {
    this.type  = type;
    this.repos = this.cache[type];
  }
}
