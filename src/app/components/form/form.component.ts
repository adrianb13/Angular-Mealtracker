import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InfoService } from 'src/app/service/info.service';
import { DataListService } from 'src/app/service/data-list.service';
import * as variables from "../../service/variables";
import { NutritionService } from 'src/app/service/nutrition.service';
import { IfStmt } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';

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

  selected = []
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

  ngOnInit() {
    this.url = this.Route.snapshot.url[0].path;
    console.log(this.Route.snapshot)
    this.formType()
  }

  //Determines what form to display.
  formType(){
    if(this.url === "add" && this.addItem === variables.Tracker){
      this.placeholder = "Ex: John's Tracker";
      this.selectedItem = "";
    } else if (this.url === "add" && this.addItem === variables.Meal){
      this.placeholder = "Ex: Breakfast/Denny's";
      this.selectedItem = "Tracker: " + this.Nutri.itemValue[0].name;
    } else if(this.url === "add" && this.addItem === variables.FoodItem){
      this.food = true;
      this.placeholder = "Ex: Salad";
      this.selectedItem = "Meal: " + this.Nutri.itemValue[0].name;
    } else {
      // If url is "update"
      this.findSelected();
    };
  }

  //Displays info of selected Tracker/Meal/Food if Updating/Deleting
  findSelected(){
    if (this.url === "update" && this.addItem === variables.Tracker){
      this.add = false;
      this.selected = this.Nutri.trackersValue.filter(res => res.id === +this.Route.snapshot.params.id);
      this.selectedItem = variables.Tracker + ": " + this.selected[0].name;
      
    } else if (this.url === "update" && this.addItem === variables.Meal){
      this.add = false;
      this.selected = this.Nutri.mealsValue.filter(res => res.id === +this.Route.snapshot.params.id2);
      this.selectedItem = variables.Meal + ": " + this.selected[0].name;
      
    } else if (this.url === "update" && this.addItem === variables.FoodItem){
      this.add = false;
      this.food = true; 
      this.selected = this.Nutri.foodValue.filter(res => res.id === +this.Route.snapshot.params.id2);
      this.selectedItem = variables.FoodItem + ": " + this.selected[0].name;
      this.name = this.selected[0].name
      this.fat = this.selected[0].fat;
      this.carbs = this.selected[0].carbs;
      this.protein = this.selected[0].protein;
      this.calories = this.selected[0].calories;
      
    };
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

  updateItem(event){
    event.preventDefault();
    if(this.addItem === variables.Tracker){
      let item = {
        id: this.Route.snapshot.params.id,
        name: this.name
      }
      this.DataList.updateTracker(item, this.Route.snapshot.params.id).subscribe(res => {
        this.Router.navigate([""]);
      });
    } else if (this.addItem === variables.Meal){
      let item = {
        id: this.Route.snapshot.params.id2,
        name: this.name
      }
      this.DataList.updateMeal(item, this.Route.snapshot.params.id1, this.Route.snapshot.params.id2).subscribe(res => {
        this.Router.navigate([""]);
      })
    } else if (this.addItem === variables.FoodItem){
      this.DataList.updateFood(this.name, this.fat, this.carbs, this.protein, this.calories, this.Route.snapshot.params.id1, this.Route.snapshot.params.id2).subscribe(res => {
        this.Router.navigate([""]);
      })
    }
  }

  deleteItem(){
    if(this.addItem === variables.Tracker){
      console.log(this.Route.snapshot.params.id)
      this.DataList.deleteTracker(this.Route.snapshot.params.id).subscribe(res => {
        this.Router.navigate([""])
      });
    } else if (this.addItem === variables.Meal){
      console.log(this.Route.snapshot.params.id2)
      this.DataList.deleteMeal(this.Route.snapshot.params.id2).subscribe(res => {
        this.Router.navigate([""]);
      });
    } else if (this.addItem === variables.FoodItem){
      console.log(this.Route.snapshot.params.id2)
      this.DataList.deleteFood(this.Route.snapshot.params.id2).subscribe(res => {
        this.Router.navigate([""])
      });
    }
  }
}
