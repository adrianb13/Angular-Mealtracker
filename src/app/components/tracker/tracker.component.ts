import { Component, OnInit } from '@angular/core';
import { DataListService } from 'src/app/service/data-list.service';
import { NutritionService } from 'src/app/service/nutrition.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  listHeader = "Trackers"
  addItem = "Tracker"
  trackerList = true;
  trackerData = false;
  tracker = true;
  itemSelected = false;

  dataList = [];
  trackers = [];
  meals = [];
  food = [];
  
  trackerId = null;
  mealId = null;
  foodId = null;

  apiRoute = ""

  constructor(private DataList: DataListService, private Nutri: NutritionService) { }

  ngOnInit() {
    this.DataList.getTrackers().subscribe(res => {
      if(res){
        this.trackers.push(res);
        if(this.trackers.length > 0){
          this.trackers = this.trackers[0];
          this.dataList = this.trackers;
          this.trackerData = true;
        }
      }
      
    });
  };

  format(dateTime) {
    return new Date(dateTime).toLocaleDateString();
  };

  getMeals(trackerId){
    this.DataList.getMeals(trackerId).subscribe(res => {     
      if(res) {
        //console.log("meals",res)
        this.meals.push(res);
        if(this.meals.length > 0){
          this.trackerId = trackerId;
          this.meals = this.meals[0];
          this.dataList = this.meals;
          this.trackerData = true;
          this.tracker = false;
          this.listHeader = "Meals";
          this.addItem = "Meal";
        }
      } else {
        this.trackerData = false;
      }
      this.trackerList = false;
    });
  };

  getData(dataId){
    if(this.listHeader === "Meals"){
      this.DataList.getFood(dataId).subscribe(res => {
        if(res) {
          //console.log("food",res);
          this.food.push(res);
          if(this.food.length > 0){
            this.mealId = dataId;
            this.food = this.food[0];
            this.dataList = this.food;
            this.trackerData = true;
            this.tracker = false;
            this.listHeader = "Food Items";
            this.addItem = "Food Item";
          }
        } else {
          this.trackerData = false;
        }
      })
    } else if (this.listHeader = "Food Items") {
      let item = this.food.filter(res => res.id === dataId)
      //console.log(item)
      if(item.length > 0){
        this.Nutri.setItem(item);
        this.itemSelected = true;
      }
    }
    this.trackerList = false;
  };

  getBack(){
    if(this.listHeader === "Meals"){
      this.mealId = 0;
      this.meals = [];
      this.dataList = this.trackers;
      this.trackerList = true;
      this.trackerData = true;
      this.tracker = true;
      this.listHeader = "Tracker";
      this.addItem = "Tracker";
    } else if (this.listHeader === "Food Items"){
      this.foodId = 0;
      this.food = [];
      this.dataList = this.meals;
      this.trackerData = true;
      this.tracker = false;
      this.itemSelected = false;
      this.listHeader = "Meals";
      this.addItem = "Meal";
    }
  }

}
