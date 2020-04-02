import { Component, OnInit } from '@angular/core';
import { NutritionService } from 'src/app/service/nutrition.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  name = "Food Item";
  calories = 0;
  fat = 0
  carbs = 0;
  protein = 0;

  constructor(private Nutri: NutritionService) { }

  ngOnInit(): void {
    console.log(this.Nutri.itemValue)
    if(this.Nutri.itemValue){
      this.name = this.Nutri.itemValue.name;
      this.calories = this.Nutri.itemValue.calories;
      this.fat = this.Nutri.itemValue.fat;
      this.carbs = this.Nutri.itemValue.carbs;
      this.protein = this.Nutri.itemValue.protein;
    }
  }

}
