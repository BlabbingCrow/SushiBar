import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GoodsComponent } from './goods.component';

export const ROUTES: Routes = [
  { path: '', component: GoodsComponent}
];

@NgModule({
  declarations: [
    GoodsComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule
  ]
})
export class GoodsModule { }
