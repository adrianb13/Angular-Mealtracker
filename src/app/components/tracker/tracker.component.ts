import { Component, OnInit } from '@angular/core';
import { DataListService } from 'src/app/service/data-list.service';
import { NutritionService } from 'src/app/service/nutrition.service';
import { InfoService } from 'src/app/service/info.service';
import * as variables from "../../service/variables"; 

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  listHeader = variables.Trackers; //Display Header
  addItem = variables.Tracker;  //Tracks what should be added on Add Button

  trackerList = true; //Show or hide "Back" button
  trackerData = false; //If data is present 
  tracker = true; //If on tracker screen
  itemSelected = false; //Show or hide Nutrition table

  dataList = [];
  trackers = [];
  meals = [];
  food = [];

  apiRoute = variables.apiBaseUpdate;

  constructor(
    private DataList: DataListService, 
    private Info: InfoService, 
    private Nutri: NutritionService
  ) { }

  ngOnInit() {
    //Get Trackers (if present)
    this.Info.setAddItem(variables.Tracker);
    this.DataList.getTrackers().subscribe(res => {
      if(res){
        this.trackers.push(res);
        if(this.trackers[0].length > 0){
          this.Nutri.setTrackers(this.trackers[0]); //Sends to Nutri Service for use in other components
          this.trackers = this.trackers[0];
          this.dataList = this.trackers; //Sends specific list to be displayed
          this.trackerData = true;
        }
      }
      
    });
  };

  format(dateTime) {
    return new Date(dateTime).toLocaleDateString();
  };

  //Get Meals Info
  getMeals(trackerId){
    //Sets chosen Tracker Id
    this.Info.setTrackerId(trackerId);
    this.apiRoute = variables.apiBaseUpdate + "/" + trackerId;
    this.updateSelected(trackerId);

    //Gets Meals connected to selected Tracker
    this.DataList.getMeals(trackerId).subscribe(res => {    
      //If data is present   
      if(res) {
        //console.log("meals",res)
        this.meals.push(res);
        if(this.meals[0].length > 0){
          this.Nutri.setMeals(this.meals[0]); //Sends to Nutri Service for use in other components
          this.meals = this.meals[0];
          this.dataList = this.meals.reverse(); //Sends specific list to be displayed
          this.trackerData = true;
          this.tracker = false;
          this.listHeader = variables.Meals;
          this.addItem = variables.Meal;
          this.Info.setAddItem(variables.Meal);
        } else {
          //If not data available - show "Not Available" view
          this.trackerData = false;
          this.tracker = false;
          this.listHeader = variables.Meals;
          this.addItem = variables.Meal;
          this.Info.setAddItem(variables.Meal);
        };
      }

      //Changes view to not show tracker display
      this.trackerList = false;
    });
  };

  //Get Food Info
  getData(dataId){
    //Checks if Meals or Foods are showing
    if(this.listHeader === variables.Meals){
      //Sets chosen Meal Id
      this.Info.setMealId(dataId);
      this.apiRoute = variables.apiBaseUpdate + "/" + dataId;
      this.updateSelected(dataId);

      //Gets related Foods connected to selected Meal
      this.DataList.getFood(dataId).subscribe(res => {
        //If data is present
        if(res) {
          //console.log("food",res);
          this.food.push(res);
          if(this.food[0].length > 0){
            this.Nutri.setFood(this.food[0]); //Sends to Nutri Service for use in other components
            this.food = this.food[0];
            this.dataList = this.food.reverse(); //Sends specific list to be displayed
            this.trackerData = true;
            this.tracker = false;
            this.listHeader = variables.FoodItems;
            this.addItem = variables.FoodItem;
            this.Info.setAddItem(variables.FoodItem);
          } else {
            //If not data available - show "Not Available" view
            this.trackerData = false;
            this.tracker = false;
            this.listHeader = variables.FoodItems;
            this.addItem = variables.FoodItem;
            this.Info.setAddItem(variables.FoodItem);
          };
        } 
      });

    } else if (this.listHeader = variables.FoodItems) {
      //Sets chosen Food Id
      this.Info.setFoodId(dataId);
      this.apiRoute = variables.apiBaseUpdate + "/" + dataId;
      this.updateSelected(dataId);
      
    };

    //Changes view to not show tracker display
    this.trackerList = false;
  };

  //Back Button
  getBack(){
    //Back to Tracker from Meal
    if(this.listHeader === variables.Meals){
      this.Info.setMealId(0);
      this.meals = [];
      this.dataList = this.trackers; //Eliminates API call
      this.trackerList = true;
      this.trackerData = true;
      this.tracker = true;
      this.itemSelected = false;
      this.listHeader = variables.Trackers;
      this.addItem = variables.Tracker;
      this.apiRoute = variables.apiTracker;
      this.Info.setAddItem(variables.Tracker);

    //Back to Meal from Food
    } else if (this.listHeader === variables.FoodItems){
      this.Info.setFoodId(0);
      this.food = [];
      this.dataList = this.meals; //Eliminates API call
      this.trackerData = true;
      this.tracker = false;
      this.itemSelected = false;
      this.listHeader = variables.Meals;
      this.addItem = variables.Meal;
      this.apiRoute = variables.apiMeal;
      this.Info.setAddItem(variables.Meal);
    };
  };

  updateSelected(dataId){
    if(this.listHeader === variables.Trackers){
      let item = this.trackers.filter(res => res.id === dataId)
      if(item.length > 0){
        this.Nutri.setItem(item);
      };
    } else if (this.listHeader === variables.Meals){
      let item = this.meals.filter(res => res.id === dataId)
      if(item.length > 0){
        this.Nutri.setItem(item);
      };
    } else if (this.listHeader === variables.FoodItems){
      let item = this.food.filter(res => res.id === dataId)
      if(item.length > 0){
        this.Nutri.setItem(item);
        this.itemSelected = true;
      };
    };
  }
}
