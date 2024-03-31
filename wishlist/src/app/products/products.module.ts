import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ProductsListComponent,
  ]
})
export class ProductsModule { }
