import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div
      class="max-w-sm bg-slate-100 border border-gray-200 rounded-lg shadow-sm flex flex-col items-center pt-3 mx-auto"
    >
      <img
        [src]="product().image"
        [alt]="product().title"
        class="rounded-t-lg w-[150px] h-[150px] object-contain mix-blend-multiply"
      />

      <div
        class="flex flex-col py-3 px-5 bg-white w-full mt-2 rounded-tl-3xl rounded-tr-3xl gap-3 rounded-bl-lg rounded-br-lg"
      >
        <div>
          <p
            class="whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px] mb-1"
          >
            {{ product().title }}
          </p>
          <p
            class="text-xs text-gray-500 overflow-hidden text-ellipsis max-w-[350px] line-clamp-2"
          >
            {{ product().description }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              width="20"
              height="20"
              style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd"
              viewBox="0 0 6.827 6.827"
            >
              <path
                style="fill:#ff8f00;fill-rule:nonzero"
                d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923-1.343.923-.239.164.082-.278.462-1.564-1.292-.992-.23-.176.29-.008 1.63-.044.544-1.535.097-.274z"
              />
              <path
                style="fill:#e68100;fill-rule:nonzero"
                d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923V.98z"
              />
              <path style="fill:none" d="M0 0h6.827v6.827H0z" />
            </svg>

            <span class="text-xs text-gray-500">
              {{ product().rating.rate }} / 5
              <span class="text-gray-400">({{ product().rating.count }})</span>
            </span>
          </div>

          <span class="font-bold text-global-primary text-xs">
            ₱{{ product().price }}
          </span>
        </div>

        <div>
          <button
            (click)="cartService.addToCart(product())"
            type="button"
            class="w-full cursor-pointer rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);

  product = input.required<Product>();
}
