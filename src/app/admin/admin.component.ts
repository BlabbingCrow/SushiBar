import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../goods/Product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  constructor(private httpClient: HttpClient) { }
  //way = "sushibarback.herokuapp.com";
  way = "localhost:3001";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.get(`http://${this.way}/goods`).subscribe((result: any) => this.products = result);
  }

  buttonCreateClick(name: string, description: string, price: string, url: string) {
    this.httpClient.post(`http://${this.way}/goods/create`, {
      name: name,
      description: description,
      price: price,
      url: url
    }, this.options).subscribe((result: any) => {
      if (!result) return;
      this.products.push({id: result.id, name: result.name, description: result.description, price: result.price, url: result.url});
    });
  }

  buttonUpdateClick(id: number, name: string, description: string, price: string, url: string) {
    this.httpClient.post(`http://${this.way}/goods/update`, {
      id: id,
      name: name,
      description: description,
      price: price,
      url: url
    }, this.options).subscribe((result: any) => {
      if (!result) return;
      let productIndex = this.products.findIndex(x => x.id == result.id);
      if (productIndex == -1) return;
      this.products[productIndex] = result;
    });
  }

  buttonDeleteClick(id: number) {
    this.httpClient.post(`http://${this.way}/goods/delete`, {
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
