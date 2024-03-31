import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { EventService } from 'src/shared/services/EventService';
import { WishModule } from './wish/wish.module';
import { ContactModule } from './contact/contact.module';
import { RouterDemoFirstComponent } from './router-demo-first/router-demo-first.component';
import { RouterDemoSecondComponent } from './router-demo-second/router-demo-second.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    RouterDemoFirstComponent,
    RouterDemoSecondComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    WishModule,
    ContactModule,
    AppRoutingModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
