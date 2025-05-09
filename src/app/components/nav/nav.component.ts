import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  template: `
    <div
      class="w-full bg-slate-200 px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-10"
    >
      <img
        routerLink="/"
        src="https://cdn-icons-png.flaticon.com/512/12373/12373591.png"
        alt="logo"
        class="w-10 h-10 cursor-pointer"
      />
      <p
        class="text-global-primary text-sm flex items-center gap-2 cursor-pointer hover:opacity-85"
        routerLink="/cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          width="20"
          height="20"
          color="var(--color-cart-primary)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>

        My Cart ({{ cartService.cart().length }})
      </p>
    </div>
  `,
  styles: ``,
})
export class NavComponent {
  cartService = inject(CartService);
}
