import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  addItem = null;
  trackerId = null;
  mealId = null;
  foodId = null;

  constructor() { }

  get addItemValue(){
    this.addItem = localStorage.getItem("addItem");
    return this.addItem;
  }
  
  setAddItem(value){
    this.addItem = localStorage.setItem("addItem", value);
    
  }

  get trackerIdValue(){
    this.trackerId = localStorage.getItem("trackerId");
    return this.trackerId;
  }

  setTrackerId(value){
    this.trackerId = localStorage.setItem("trackerId", value);
  }

  get mealIdValue(){
    this.mealId = localStorage.getItem("mealId");
    return this.mealId;
  }

  setMealId(value){
    this.mealId = localStorage.setItem("mealId",value);
  }

  get foodIdValue(){
    this.foodId = localStorage.getItem("mealId");
    return this.foodId;
  }

  setFoodId(value){
    this.foodId = localStorage.setItem("foodId", value);
  }
}
