import { Component, Inject } from '@angular/core';

import { SearchComponent } from '../search/search.component';

@Component({
  selector   : 'app-user',
  templateUrl: './user.component.html',
  styleUrls  : ['./user.component.scss']
})
export class UserComponent {
  constructor(@Inject(SearchComponent) public parent: SearchComponent) {
  }

  showValue(value): string {
    return value ? `<strong>${value}</strong>` : '<small class="text-muted">não informado</small>';
  }
}
