import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  item = [];
  trackers = [];
  meals = [];
  food = [];

  constructor() { }

  get itemValue(){
    return this.item;
  }
  setItem(value){
    this.item = value;
  }

  get trackersValue(){
    return this.trackers;
  }
  setTrackers(value){
    this.trackers = value;
  }

  get mealsValue(){
    return this.meals;
  }
  setMeals(value){
    this.meals = value;
  }

  get foodValue(){
    return this.food;
  }
  setFood(value){
    this.food = value;
  }
}