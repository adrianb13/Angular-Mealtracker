import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as variables from "../service/variables";

interface trackers {
  id: number,
  name: string,
  created_at: number
}
interface addTracker {
  name: string
}
interface updateTracker {
  tracker: object
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
interface updateMeal {
  meal: object
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
interface updateFood {
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
}
interface deleteItem {
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(private http: HttpClient) { }

  //Tracker API
  getTrackers(){
    return this.http.get<trackers>(variables.apiURL + "/api/trackers");
  };
  addTracker(name){
    return this.http.post<addTracker>(variables.apiURL + "/api/trackers", {
      name
    });
  };
  updateTracker(tracker, trackerId){
    return this.http.put<updateTracker>(variables.apiURL + "/api/trackers/" + trackerId, {
      id: tracker.id,
      name: tracker.name
    });
  };
  deleteTracker(trackerId){
    return this.http.delete<deleteItem>(variables.apiURL + "/api/trackers/" + trackerId)
  };

  //Meals API
  getMeals(trackerId){
    return this.http.get<meals>(variables.apiURL + "/api/meals/" + trackerId);
  };
  addMeal(name, trackerId){
    return this.http.post<addMeal>(variables.apiURL + "/api/meals/" + trackerId, {
      name
    });
  };
  updateMeal(meal, trackerId, mealId){
    return this.http.put<updateMeal>(variables.apiURL + "/api/meals/" + trackerId + "/" + mealId, {
      id: meal.id,
      name: meal.name,
      mealTracker: {
        id: trackerId
      }
    });
  };
  deleteMeal(mealId){
    return this.http.delete<deleteItem>(variables.apiURL + "/api/meals/"+ mealId)
  };

  //Food API
  getFood(mealId){
    return this.http.get<foods>(variables.apiURL + "/api/food/" + mealId);
  };
  addFood(name, fat, carbs, protein, calories, mealId){
    return this.http.post<addFood>(variables.apiURL + "/api/food/" + mealId, {
      name,
      fat,
      carbs,
      protein,
      calories
    });
  };
  updateFood(name, fat, carbs, protein, calories, mealId, foodId){
    return this.http.put<updateFood>(variables.apiURL + "/api/food/" + mealId + "/" + foodId, {
      id: foodId,
      name: name,
      fat: fat,
      carbs: carbs,
      protein: protein,
      calories: calories,
      meal: {
        id: mealId
      }
    });
  };
  deleteFood(foodId){
    return this.http.delete<deleteItem>(variables.apiURL + "/api/food/"+ foodId)
  };
}
