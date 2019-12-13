import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './Product';
import { way } from '../config';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {

  products: Product[] = [];
  findText = '';
  lastFindText = '';
  waitTimes = 0;

  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.post(`${way}/goods`, `data=${JSON.stringify({
      token: this._authCookie.getAuth(), pageName: 'goods'
      })}`, this.options).subscribe((result: any) => {
      if (result) {
        this.products = result;
      } else {
        this.router.navigate(['/']);
      }
    });
    setInterval(() => {
      if (this.waitTimes !== 0) {
        this.waitTimes--;
      } else {
        if (this.lastFindText !== this.findText) {
          this.lastFindText = this.findText;
          this.waitTimes = 10;
          this.httpClient.post(`${way}/goods`, `data=${JSON.stringify({
            token: this._authCookie.getAuth(), pageName: 'goods', data: { findText: this.findText
            }})}`, this.options).subscribe((result: any) => {
            if (result) {
              this.products = result;
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      }
    }, 100);
  }
}
