import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">FESD-FN-XXX</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
    <footer class="text-center text-secondary py-4 small">Front-End Software Development • Final Lab</footer>
  `
})
export class AppComponent {}
