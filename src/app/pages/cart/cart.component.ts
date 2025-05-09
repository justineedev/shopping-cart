import { Component, inject } from '@angular/core';
import { CartCardComponent } from '../../components/cart-card/cart-card.component';
import { CartService } from '../../services/cart.service';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart',
  imports: [CartCardComponent, CartSummaryComponent],
  template: `
    <div class="flex flex-row w-full p-8 gap-4 flex-wrap md:flex-nowrap">
      @if (cartService.totalCartItems() < 1) {
      <p class="text-xl font-medium text-global-primary">Your cart is empty</p>
      } @else {
      <div
        class="bg-slate-100 w-full md:w-2/3 rounded-sm p-5 shadow-md h-full overflow-y-auto"
      >
        <p class="text-xl font-medium text-global-primary">My Cart</p>
        @for (cartItems of cartService.cart(); track cartItems.product.id) {
        <app-cart-card [cartItemDetails]="cartItems" />
        }
      </div>

      <div
        class="bg-slate-100 w-full md:w-1/3 rounded-sm shadow-md p-5 h-full md:sticky md:top-20"
      >
        <p class="text-xl font-medium text-global-primary">Summary</p>
        <app-cart-summary />
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartService);
}
