import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{
  items = [];

  constructor(
    private http: HttpClient
  ) {}

/**
 * Add a product to the cart.
 */
  addToCart(product)
  {
    this.items.push(product)
  }

/**
 * Get items from the cart.
 */
  getItems()
  {
    return this.items
  }
  /**
   * Clear the cart.
   */
  clearCart()
  {
    this.items = []
    return this.items
  }

  /**
   * Get the shipping prices.
   */
  getShippingPrices()
  {
    return this.http.get('/assets/shipping.json');
  }


}