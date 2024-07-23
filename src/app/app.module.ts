import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { BargraphComponent } from "./bargraph/bargraph.component";
import { PiechartComponent } from "./Piechart/piechart.component";
import { AppRoutingModule } from './/app-routing.module';
import { ScatterplotComponent } from "./scatterplot/scatterplot.component";

@NgModule({
  declarations: [
    AppComponent,
    BargraphComponent,
    PiechartComponent,
    ScatterplotComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
