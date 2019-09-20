import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { GoodsComponent } from './goods/goods.component'
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'goods', loadChildren: './goods/goods.module#GoodsModule'},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
