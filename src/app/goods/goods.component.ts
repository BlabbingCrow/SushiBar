import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './Product';
import { way } from '../config';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {

  products: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(`${way}/goods`).subscribe((result: any) => this.products = result);
  }
}
