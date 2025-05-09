import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models/products.model';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>(this.loadCartFromStorage());
  discount = signal<number>(0);
  couponCode = signal<string>('');

  constructor(private toast: HotToastService) {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cart()));
    });
  }

  private loadCartFromStorage(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  addToCart = (product: Product) => {
    this.toast.success('Product added to cart');

    const existingItem = this.cart().find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      this.cart.update((cart) =>
        cart.map((item) => {
          if (item.product.id === product.id) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * product.price,
            };
          }
          return item;
        })
      );
    } else {
      this.cart.update((cart) => [
        ...cart,
        {
          product,
          quantity: 1,
          subtotal: product.price,
        },
      ]);
    }
  };

  removeFromCart = (productId: number) => {
    this.cart.update((cart) =>
      cart.filter((item) => item.product.id !== productId)
    );
  };

  addQuantity = (productId: number) => {
    this.cart.update((cart) =>
      cart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.product.price,
          };
        }
        return item;
      })
    );
  };

  minusQuantity = (productId: number) => {
    const item = this.cart().find((item) => item.product.id === productId);

    if (!item) return;

    if (item.quantity <= 1) {
      this.removeFromCart(productId);
    } else {
      this.cart.update((cart) =>
        cart.map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity - 1;
            return {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.product.price,
            };
          }
          return item;
        })
      );
    }
  };

  applyCoupon = (couponCode: string): void => {
    this.couponCode.set(couponCode);
    const discountCoupons = [
      { code: 'SAVE10', discount: 10 },
      { code: 'ISAVE15', discount: 15 },
      { code: 'MEGA20', discount: 20 },
    ];

    const matchedCoupon = discountCoupons.find((c) => c.code === couponCode);

    this.discount.set(matchedCoupon?.discount ?? 0);
  };

  totalCartItems = computed(() =>
    this.cart().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalGrossAmount = computed(
    () =>
      Math.floor(
        this.cart().reduce((acc, item) => acc + item.subtotal, 0) * 100
      ) / 100
  );

  totalDiscountAmount = computed(() => {
    const gross = this.totalGrossAmount();
    const discountPercent = this.discount();

    return Math.floor(gross * (discountPercent / 100) * 100) / 100;
  });

  totalNetAmount = computed(() => {
    const gross = this.totalGrossAmount();
    const discountPercent = this.discount();

    return Math.floor(gross * ((100 - discountPercent) / 100) * 100) / 100;
  });

  checkout = () => {
    this.toast.success('Checkout successful');
  };
}
