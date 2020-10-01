import { Component, Input } from '@angular/core';

@Component({
  selector   : 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() user: any;

  showValue(value): string {
    return value ? `<strong>${value}</strong>` : '<small class="text-muted">não informado</small>';
  }
}
