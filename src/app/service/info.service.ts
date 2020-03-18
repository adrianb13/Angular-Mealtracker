import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  addItem = "Tracker";
  trackerId = null;
  mealId = null;
  foodId = null;

  constructor() { }

  get addItemValue(){
    return this.addItem;
  }
  
  setAddItem(value){
    this.addItem = value;
  }

  get trackerIdValue(){
    return this.trackerId;
  }

  setTrackerId(value){
    this.trackerId = value;
  }

  get mealIdValue(){
    return this.mealId;
  }

  setMealId(value){
    this.mealId = value;
  }

  get foodIdValue(){
    return this.foodId;
  }

  setFoodId(value){
    this.foodId = value;
  }
}
