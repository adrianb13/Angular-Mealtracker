import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  item = null;
  trackers = null;
  meals = null;
  food = null;

  constructor() { }

  get itemValue(){
    this.item = JSON.parse(localStorage.getItem("item"))
    return this.item;
  };
  setItem(value){
    this.item = localStorage.setItem("item", JSON.stringify(value[0]));
  };

  get trackersValue(){
    this.trackers = JSON.parse(localStorage.getItem("tracker"));
    return this.trackers;
  };
  setTrackers(value){
    this.trackers = localStorage.setItem("tracker", JSON.stringify(value));
  };

  get mealsValue(){
    this.meals = JSON.parse(localStorage.getItem("meals"));
    return this.meals;
  };
  setMeals(value){
    this.meals = localStorage.setItem("meals", JSON.stringify(value));
  };

  get foodValue(){
    this.food = JSON.parse(localStorage.getItem("food"));
    return this.food;
  };
  setFood(value){
    this.food = localStorage.setItem("food", JSON.stringify(value));
  };
}