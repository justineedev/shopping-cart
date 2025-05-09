import { Component, inject, input } from '@angular/core';
import { CartItem, Product } from '../../models/products.model';
import { IconsModule } from '../../icons/icons.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-card',
  imports: [IconsModule],
  template: `
    <div
      class="relative w-full my-2 py-5 flex flex-row shadow-sm rounded-sm px-5 border-[1px] border-gray-200 gap-4 items-center"
    >
      <button
        type="button"
        (click)="cartService.removeFromCart(cartItemDetails().product.id)"
      >
        <i-feather
          name="trash2"
          style="width: 20px; height: 20px;"
          class="cursor-pointer text-red-700"
        />
      </button>

      <div>
        <img
          [src]="cartItemDetails().product.image"
          [alt]="cartItemDetails().product.title"
          class="w-15 h-15 rounded-sm mix-blend-multiply"
        />
      </div>

      <div class="flex flex-col w-full">
        <span class="text-sm w-full min-w-40">{{
          cartItemDetails().product.title
        }}</span>

        <div class="text-xs text-gray-400">
          {{ cartItemDetails().product.category }}
        </div>

        <div class="flex items-center gap-1 mt-2 w-full">
          <div class="flex gap-1.5">
            <button
              type="button"
              (click)="cartService.addQuantity(cartItemDetails().product.id)"
            >
              <i-feather
                name="plus-circle"
                style="width: 20px; height: 20px;"
                class="cursor-pointer"
              />
            </button>

            <span class="text-sm">{{ cartItemDetails().quantity }}</span>

            <button
              type="button"
              (click)="cartService.minusQuantity(cartItemDetails().product.id)"
            >
              <i-feather
                name="minus-circle"
                style="width: 20px; height: 20px;"
                class="cursor-pointer"
              />
            </button>
          </div>

          <span class="text-xs ml-2"
            >Price: ₱{{ cartItemDetails().product.price }}</span
          >

          <span class="text-sm text-global-primary ml-auto"
            >Subtotal:
            <span class="font-bold"
              >₱{{ cartItemDetails().subtotal }}</span
            ></span
          >
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CartCardComponent {
  cartService = inject(CartService);

  cartItemDetails = input.required<CartItem>();
}
