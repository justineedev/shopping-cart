import { Component, inject, input, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  imports: [],
  template: `
    <div class="flex flex-col my-2 gap-2">
      <div class="my-3">
        <label
          for="coupon-input"
          class="block text-sm font-medium text-gray-900"
          >Coupon (automatic discount)</label
        >
        <input
          [value]="cartService.couponCode()"
          (input)="onCouponCodeChange($event)"
          [readOnly]="cartService.totalCartItems() < 1"
          type="text"
          id="coupon-input"
          placeholder="Enter Discount Code"
          class="my-1 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
        @if (!!cartService.totalDiscountAmount()) {
        <p class="text-xs text-green-700">
          Coupon applied.
          <span class="font-medium">{{ cartService.discount() }}% off</span>
        </p>
        }
      </div>

      <div class="flex flex-row justify-between ">
        <p>
          Subtotal
          <span class="text-sm"
            >({{ cartService.totalCartItems() }} items)</span
          >
        </p>
        <p class="text-global-primary">
          ₱ {{ cartService.totalGrossAmount() }}
        </p>
      </div>

      <div class="flex flex-row justify-between ">
        <p class="">Discount</p>
        <p class="text-global-primary">
          -₱ {{ cartService.totalDiscountAmount() }}
        </p>
      </div>

      <hr />

      <div class="flex flex-col gap-1">
        <div class="flex flex-row justify-between">
          <p>Grand Total</p>
          <p class="text-global-primary">
            ₱ {{ cartService.totalNetAmount() }}
          </p>
        </div>
        <span class="text-gray-500 text-xs ml-auto">No hidden charges</span>
      </div>

      <div class="mt-5">
        <button
          (click)="cartService.checkout()"
          class="bg-global-primary text-white px-4 py-2 rounded-md w-full cursor-pointer hover:opacity-85"
        >
          Checkout
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CartSummaryComponent {
  cartService = inject(CartService);

  onCouponCodeChange(event: Event) {
    const code = (event.target as HTMLInputElement).value;
    this.cartService.applyCoupon(code);
  }
}
