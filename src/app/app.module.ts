import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeviewModule } from './lib/itreeview.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TreeviewModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
