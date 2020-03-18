import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface trackers {
  id: number,
  name: string,
  created_at: number
}
interface addTracker {
  name: string
}

interface meals {
  id: number,
  name: string,
  created_at: number
}
interface addMeal {
  name: string,
  trackerId: number
}

interface foods {
  id: number,
  name: string,
  created_at: number
}
interface addFood {
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  mealId: number
}

@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(private http: HttpClient) { }

  getTrackers(){
    return this.http.get<trackers>("/api/trackers");
  }

  addTracker(name){
    return this.http.post<addTracker>("api/trackers", {
      name
    });
  }

  getMeals(trackerId){
    return this.http.get<meals>("api/meals/" + trackerId);
  }

  addMeal(name, trackerId){
    return this.http.post<addMeal>("api/meals/" + trackerId, {
      name
    });
  }

  getFood(mealId){
    return this.http.get<foods>("api/food/" + mealId);
  }

  addFood(name, fat, carbs, protein, calories, mealId){
    return this.http.post<addFood>("api/food/" + mealId, {
      name,
      calories,
      fat,
      carbs,
      protein
    });
  }
}
