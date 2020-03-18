import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { DataListService } from "./service/data-list.service";

import { AppComponent } from './app.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    BannerComponent,
    HomeComponent,
    NutritionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "**",
        component: HomeComponent
      }
    ])
  ],
  providers: [DataListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
