import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  item = []

  constructor() { }

  setItem(value){
    this.item = value;
  }

  get itemValue(){
    return this.item;
  }
}