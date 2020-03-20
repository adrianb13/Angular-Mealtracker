# MealtrackerAngular

This is the Front-End of the Meal Tracker Application.  It was created using Angular. 
The application was deployed here: https://mealtracker-angular.herokuapp.com/

The same application was also written in React Redux: https://github.com/adrianb13/ReactRedux-MealTracker

## About

The application allows you to create a "Meal Tracker" of your own to help you keep track of your diet/nutrition. Each "Meal Tracker" consists of a list of "Meals/Snacks" that you eat everyday day. It will automatically date the "Meal" for you so you don't have to know what day it is or remember to keep your organized. Each "Meal" consists of multiple "Food Items." These "Food Items" allow you to enter the nutritional value of each item. All levels are editable/updatable and/or can be deleted.

## Walkthrough

### Creating a Tracker
  1. First, I will create a tracker called "Adrian's Tracker."
  * You would click the "Add a Tracker" link on the home screen.
  * This takes you to a form where all is needs is a "Name" for the tracker. So I enter "Adrian's Tracker"
  * This is save to the database and routed to view my tracker.

### Creating a Meal
  2. I then click my tracker called "Adrian's Tracker." This will take me to a List of "Meals."
  * This is my first meal so I would click "Add a Meal".
  * Again, only the "Name" is needed. So I type "Breakfast"
  * This is save to the database within "Adrian's Tracker" under the Meal name "Breakfast"
  * You are then routed back to the main page.

### Adding all the Meal Items I ate as part of the meal

  3. I then click my tracker again or can Add/Edit/Delete the tracker is you so please.
  * I want to view it, and this time you see "Breakfast" as part of your "Meals."
  * I need to add the details of "Breakfast." So I click it which takes me to the the "Meal Items" page, where I can add everything I  ate.
  * I click the link "Add a Meal Item."
  * It takes you to a form to add the Item detials. This page allows you to add as many "Meal Items" as part of your meal.
  * Let's say I ate "Hashbrowns" & "Bacon", so first I add "Hashbrowns" and it asks for the following nutritional details: "Fat (g)," "Carbs (g)," "Protein (g)," and "Calories."
  * I then click "Submit & Add Another." Which will save this meal, clear the form and allow you to add another.
  * I then add "Bacon" and all it's nutritional values. This time I click "Submit" because I don't have another Item.
  * You will then be routed to the home page where you will see your tracker.
  
### Viewing all my details (and updating/deleting, if you wish)
  4. I can now view "Adrian's Tracker" or updated it, let's say I want to name it something else. But you can also delete it and start over if you think you make a mistake.
  * To update/delete, just click the link "Update" next to each name whether it's a "Tracker," "Meal," or "Meal Item." You will have the option to change any of the details or delete it completely.
  * Let's say I want to view my "Breakfast" details. So I go to my tracker, click "Breakfast" and it lists everything I ate. If I click an item, let's say "Hashbrown," it will show all the nutrional details in a chart just below it.
