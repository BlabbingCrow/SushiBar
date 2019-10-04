import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './Product';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {

  products: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://sushibarback.herokuapp.com/goods').subscribe((result: any) => this.products = result);
  }

}
