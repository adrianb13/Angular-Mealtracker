import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InfoService } from 'src/app/service/info.service';
import { DataListService } from 'src/app/service/data-list.service';
import * as variables from "../../service/variables";
import { NutritionService } from 'src/app/service/nutrition.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../home/home.component.css']
})
export class FormComponent implements OnInit {
  selectedItem = "";
  placeholder = "";
  addItem = this.Info.addItemValue;
  url = "";
  add = true;
  food = false;

  message = "";
  name = "";
  fat = null;
  carbs = null;
  protein = null;
  calories = null;

  constructor(
    private Info: InfoService, 
    private Route: ActivatedRoute,
    private Router: Router,
    private DataList: DataListService,
    private Nutri: NutritionService
  ) { }

  ngOnInit(): void {
    this.url = this.Route.snapshot.routeConfig.path;
    this.formType()
  }

  //Determines what form to display.
  formType(){
    if(this.url === "add" && this.addItem === variables.apiTracker){
      this.placeholder = "Ex: John's Tracker";
      this.selectedItem = "";
    } else if (this.url === "add" && this.addItem === variables.Meal){
      this.placeholder = "Ex: Breakfast/Denny's";
      this.selectedItem = "Tracker: " + this.Nutri.itemValue[0].name;
    } else if(this.url === "add" && this.addItem === variables.FoodItem){
      this.food = true;
      this.placeholder = "Ex: Salad";
      this.selectedItem = "Meal: " + this.Nutri.itemValue[0].name;
    }
  }

  formValidate(){
    if(this.addItem === variables.FoodItem){
      if(!this.name || !this.fat || !this.carbs || !this.protein || !this.calories){
        this.message = "Please Fill Out Form Completely";
        return false;
      } else {
        this.message = "";
        return true;
      }
    } else {
      if(!this.name){
        this.message = "Please Fill Out Form Completely";
        return false;
      } else {
        this.message = "";
        return true;
      };
    }
  }

  //Submit to Add
  formSubmit(event){
    event.preventDefault();
    if(this.formValidate()){
      //Add Tracker
      if(this.addItem === variables.Tracker) {
        this.DataList.addTracker(this.name).subscribe(res => {
          this.Router.navigate([""]);
        });
      //Add Meal to specific Tracker
      } else if (this.addItem === variables.Meal){
        this.DataList.addMeal(this.name, this.Info.trackerId).subscribe(res => {
          this.Router.navigate([""]);
        });
      //Add Foot to specific Meal
      } else if (this.addItem === variables.FoodItem){
        this.DataList.addFood(this.name, this.fat, this.carbs, this.protein, this.calories, this.Info.mealId).subscribe(res => {
          this.Router.navigate([""]);
        });
      };
      console.log(this.name,this.fat,this.carbs,this.protein,this.calories, this.Info.mealId)
      console.log("valid") 
    };
  }

  //Submit Food and clear form to add another Food Item
  addAnother(event){
    event.preventDefault();
    if(this.formValidate()){
      this.DataList.addFood(this.name, this.fat, this.carbs, this.protein, this.calories, this.Info.mealId).subscribe(res => {
        this.message = this.name + " was saved! Add next Food Item."
        this.name = "",
        this.fat = null,
        this.carbs = null,
        this.protein = null,
        this.calories = null
      });
    };
  };
}
