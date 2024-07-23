import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BargraphComponent } from "./bargraph/bargraph.component";
import { PiechartComponent } from "./Piechart/piechart.component";

const routes: Routes = [
  // { path: "", redirectTo: "/data", pathMatch: "full" },
  { path: "", component: BargraphComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule
{

}
