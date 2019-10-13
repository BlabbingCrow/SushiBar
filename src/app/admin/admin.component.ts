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

  ngOnInit() {
    //this.httpClient.get('https://sushibarback.herokuapp.com/goods').subscribe((result: any) => this.products = result);
    this.httpClient.get('http://localhost:3001/goods').subscribe((result: any) => this.products = result);
  }

  buttonCreateClick(name: string, description: string, price: string, url: string) {
    // let body = new URLSearchParams();
    // body.set('name', name);
    // body.set('description', description);
    // body.set('price', price);
    // body.set('url', url);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.httpClient.post('http://localhost:3001/goods/create', {
      name: name,
      description: description,
      price: price,
      url: url
    }, options).subscribe((result: any) => {
      if (!result) return;
      this.products.push({id: result.id, name: result.name, description: result.description, price: result.price, url: result.url});
    });
  }

  buttonUpdateClick(name, description, price) {
    this.httpClient.post('http://localhost:3001/goods/update', {
      name: name,
      description: description,
      price: price
    }).subscribe();
  }

  buttonDeleteClick(id) {
    this.httpClient.post('http://localhost:3001/goods/delete', {
      id: id
    }).subscribe();
  }
}
