import { AfterViewInit, Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet],
  template: `
    <app-nav />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
