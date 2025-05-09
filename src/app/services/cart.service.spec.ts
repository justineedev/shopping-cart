import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from './cart.service';
import { Product } from '../models/products.model';
import { TestBed } from '@angular/core/testing';

describe('CartService', () => {
  let service: CartService;
  let toastServiceMock: jest.Mocked<HotToastService>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test description',
    image: 'test.jpg',
    category: 'Test category',
    rating: {
      rate: 5,
      count: 10,
    },
  };

  beforeEach(() => {
    toastServiceMock = {
      success: jest.fn(),
    } as unknown as jest.Mocked<HotToastService>;

    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: HotToastService, useValue: toastServiceMock },
      ],
    });

    service = TestBed.inject(CartService);
  });

  it('should add a new product to the cart', () => {
    service.addToCart(mockProduct);

    const cartItems = service.cart();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toEqual(mockProduct);
    expect(cartItems[0].quantity).toBe(1);
    expect(cartItems[0].subtotal).toBe(100);
    expect(toastServiceMock.success).toHaveBeenCalledWith(
      'Product added to cart'
    );
  });

  it('should increment the quantity of a product in the cart via addToCart', () => {
    service.addToCart(mockProduct as Product);
    service.addToCart(mockProduct as Product);

    const cartItems = service.cart();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(2);
    expect(cartItems[0].subtotal).toBe(200);
    expect(toastServiceMock.success).toHaveBeenCalledWith(
      'Product added to cart'
    );
  });

  it('should remove a product from the cart', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.id);

    const cartItems = service.cart();

    expect(cartItems.length).toBe(0);
  });

  it('should add quantity to a product in the cart via addQuantity', () => {
    service.addToCart(mockProduct);

    for (const _ of Array(3)) {
      service.addQuantity(mockProduct.id);
    }

    const cartItems = service.cart();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(4);
    expect(cartItems[0].subtotal).toBe(400);
  });

  it('should minus the quantity of a product in the cart via minusQuantity', () => {
    for (const _ of Array(3)) {
      service.addToCart(mockProduct);
    }

    service.minusQuantity(mockProduct.id);

    const cartItems = service.cart();

    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(2);
    expect(cartItems[0].subtotal).toBe(200);
  });

  it('should apply a coupon to the cart', () => {
    service.addToCart(mockProduct);
    service.applyCoupon('SAVE10');

    expect(service.discount()).toBe(10);
    expect(service.totalGrossAmount()).toBe(100);
    expect(service.totalNetAmount()).toBe(90);
  });

  it('should not apply a coupon to the cart if the coupon code is invalid', () => {
    service.addToCart(mockProduct);
    service.applyCoupon('INVALID');

    expect(service.discount()).toBe(0);
    expect(service.totalGrossAmount()).toBe(100);
    expect(service.totalNetAmount()).toBe(100);
  });
});
