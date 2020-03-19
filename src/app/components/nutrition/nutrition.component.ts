import { Component, OnInit } from '@angular/core';
import { NutritionService } from 'src/app/service/nutrition.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  item = []
  name = "Food Item";
  calories = 0;
  fat = 0
  carbs = 0;
  protein = 0;

  constructor(private Nutri: NutritionService) { }

  ngOnInit(): void {
    if(this.Nutri.itemValue.length > 0){
      this.item.push(this.Nutri.itemValue[0])
      this.name = this.item[0].name;
      this.calories = this.item[0].calories;
      this.fat = this.item[0].fat;
      this.carbs = this.item[0].carbs;
      this.protein = this.item[0].protein;
    }
  }

}
