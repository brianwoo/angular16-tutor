import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterDemoFirstComponent } from './router-demo-first/router-demo-first.component';
import { RouterDemoSecondComponent } from './router-demo-second/router-demo-second.component';
import { ContactComponent } from './contact/contact.component';
import { WishComponent } from './wish/wish.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductdetailsComponent } from './products/productdetails/productdetails.component';


const routes: Routes = [
  // this is root: /
  { path: '', component: WishComponent },
  { path: 'first', component: RouterDemoFirstComponent },
  { path: 'second', component: RouterDemoSecondComponent },
  { path: 'wish', component: WishComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductdetailsComponent },
  // default, catch all (needs to be at the end):
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }