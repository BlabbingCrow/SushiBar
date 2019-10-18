import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../goods/Product';
import { way } from '../config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  isUpdate: boolean = false;
  product: Product = new Product();

  constructor(private httpClient: HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.get(`${way}/goods`).subscribe((result: any) => this.products = result);
  }

  buttonCreateClick() {
    this.httpClient.post(`${way}/goods/create`, this.product, this.options).subscribe((result: any) => {
      if (!result) return;
      this.products.push({id: result.id, name: result.name, description: result.description, price: result.price, url: result.url});
    });
  }

  buttonLoadUpdateClick(id: number) {
    this.product = JSON.parse(JSON.stringify(this.products.find(x => x.id == id)));
    this.isUpdate = true;
  }

  buttonUpdateClick() {
    this.httpClient.post(`${way}/goods/update`, this.product, this.options).subscribe((result: any) => {
      if (!result) return;
      let productIndex = this.products.findIndex(x => x.id == result.id);
      if (productIndex == -1) return;
      this.products[productIndex] = result;
    });
    this.isUpdate = false;
  }

  buttonDeleteClick(id: number) {
    this.httpClient.post(`${way}/goods/delete`, {
      id: id
    }, this.options).subscribe((result: any) => {
      if (result) {
        let productIndex = this.products.findIndex(x => x.id == id);
        if (productIndex == -1) return;
        this.products.splice(productIndex, 1);
      }
    });
  }
}
