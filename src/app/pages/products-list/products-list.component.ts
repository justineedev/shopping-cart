import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div
      class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      @if (isLoading()) {
      <div class="flex justify-center items-center h-full">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-global-primary"
        ></div>
      </div>
      } @else if (error()) {
      <div class="text-red-500 text-center">{{ error() }}</div>
      } @else { @for (product of products(); track product.id) {
      <app-product-card
        [product]="product"
        (handleAddToCart)="cartService.addToCart(product)"
      />
      } }
    </div>
  `,
  styles: ``,
})
export class ProductsListComponent {
  cartService = inject(CartService);
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  fetchProducts = () => {
    this.isLoading.set(true);
    fetch('http://localhost:3000/products') // json-server
      .then((res) => res.json())
      .then((data) => this.products.set(data))
      .catch(() => this.error.set('Error fetching products'))
      .finally(() => this.isLoading.set(false));
  };

  ngOnInit() {
    this.fetchProducts();
  }
}
