import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ModalService } from '../model/model.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent implements OnInit {

  products: any = [];
  inCart: any = [];
  URL = '../assets/data/products.json';
  qty = 0;
  total = 0;

  constructor(private http: HttpClient, private modalService: ModalService) { }

  ngOnInit() {
    this.fetchData();
    }

    private fetchData() {
      const promise = this.http.get(this.URL).toPromise();
      promise.then((data) => {
        this.products = data;
      }, (error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
    }

    addToCart(i) {
      if (this.inCart.indexOf(i) === -1) {
        this.total = this.total + this.products.products[i].quantity * this.products.products[i].price;
        this.qty = this.qty + this.products.products[i].quantity;
        this.inCart.push(i);
      }
    }

    incQuantity(i) {
      this.products.products[i].quantity++;

      if (this.inCart.indexOf(i) >= 0) {
        this.total =  this.total + this.products.products[i].price;
        this.qty = this.qty + 1;
      }
    }

    decQuantity(i) {
      if (this.products.products[i].quantity > 0) {
        this.products.products[i].quantity--;

        if (this.inCart.indexOf(i) >= 0) {
          this.total =  this.total - this.products.products[i].price;
          this.qty = this.qty - 1;
        }
        if (this.products.products[i].quantity === 0) {
          this.inCart.splice( this.inCart.indexOf(i), 1 );

        }
      }
    }

    openModal(id: string) {
      if (this.qty > 0) {
        this.modalService.open(id);
      } else {
        id = 'noProd';
        this.modalService.open(id);
      }
    }

    closeModal(id: string) {
      if (this.qty > 0) {
      this.modalService.close(id);
      } else {
        id = 'noProd';
        this.modalService.close(id);
      }
    }
}
