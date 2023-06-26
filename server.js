const express = require("express");
const request = require("request");
const app = express();

app.get("/", (req, res) => {
  const city = req.query.city;
  request(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d48cd630dd991ab0ec8e235e3f54ca74`,
    function (error, response, body) {
      let data = JSON.parse(body);
      if (response.statusCode === 200) {
        res.json({
          city: city,
          main: data.list[0].weather[0].main,
          description: `It's ${data.list[0].weather[0].description}`,
          update_time: data.list[0].dt_txt,
        });
      }
    }
  );
});
app.listen(5000, () => console.log(`Server is running on 5000`));
