import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// tslint:disable-next-line: comment-format
//import { MainService } from '../main.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent implements OnInit {

  products: any = [];
  private singleProduct;
  private isAdded;
  URL = '../assets/data/products.json';

  constructor(
    private renderer: Renderer2,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.isAdded = new Array(this.products.length);
    this.isAdded.fill(false, 0, this.products.length);
    console.log('this.isAdded -> ', this.isAdded, this.products);

    this.fetchData();
    }

    private fetchData() {
      const promise = this.http.get(this.URL).toPromise();
      console.log(promise);
      promise.then((data) => {
        console.log('Promise resolved with: ' + JSON.stringify(data));
        this.products = data;
        console.log(data);
        console.log(this.products);

      }, (error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
    }
}
