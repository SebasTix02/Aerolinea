import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'gad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appAerolinea';
  expanded = true;
  showSidebarContent = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebarContent = this.router.url !== '/';
      }
    });
  }

  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }
}
