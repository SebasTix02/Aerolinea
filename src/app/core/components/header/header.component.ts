import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }
}
