const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + "/dist/mealtracker-angular")); // set static files location, in this case the route, add a file name if not

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname +'/dist/mealtracker-angular/index.html'));
});

//Server Side Routing to Remove Hashbang in URL
/* app.all('/*', function(req, res, next) {
  res.sendFile('app/index.html', { root: __dirname });
}); */

app.listen(PORT, function () {
  console.log("Listening on port:" + PORT);
});