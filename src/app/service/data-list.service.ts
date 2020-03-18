import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface trackers {
  id: number,
  name: string,
  created_at: number
}
interface meals {
  id: number,
  name: string,
  created_at: number
}

interface foods {
  id: number,
  name: string,
  created_at: number
}

@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(private http: HttpClient) { }

  getTrackers(){
    return this.http.get<trackers>("/api/trackers")
  }

  getMeals(trackerId){
    return this.http.get<meals>("api/meals/" + trackerId)
  }

  getFood(mealId){
    return this.http.get<foods>("api/food/" + mealId)
  }
}
