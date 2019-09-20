import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { GoodsComponent } from './goods.component';

export const ROUTES: Routes = [
  { path: '', component: GoodsComponent}
];

@NgModule({
  declarations: [
    GoodsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GoodsModule { }
