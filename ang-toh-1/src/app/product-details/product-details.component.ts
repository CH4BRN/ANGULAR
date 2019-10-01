import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Component import.
import { products } from '../products';
// Service import.
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;

  constructor(
    /* 
    ActivatedRoute is specific to each routed component loaded by the Angular Router. It contains 
    information about the route, its parameters, and 
    additional data associated with the route.
    */
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

    ngOnInit() {
    /*
    route parameters correspond to the path variables defined in the route. The productId is provided from the URL that was matched to the route. You use the productId to display the details for each unique product.
    */
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get('productId')];
      
    })
  }

  addToCart(product){
     window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }

}