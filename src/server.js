import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// define endpoint
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      errors: "City is required!",
    });
  }

  try {
    const geocodingResponse = await axios.get(process.env.OPENWEATHER_GEOCODE_URL, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        limit: 3,
      },
    });

    if (geocodingResponse.data.length === 0) {
      return res.status(404).json({
        errors: "City not found!",
      });
    }

    const { lat, lon } = geocodingResponse.data[0];

    const weatherResponse = await axios.get(process.env.OPENWEATHER_WEATHER_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric",
      },
    });

    const result = {
      city: weatherResponse.data.name,
      weather: weatherResponse.data.weather[0].main,
      description: weatherResponse.data.weather[0].description,
      temp: weatherResponse.data.main.temp,
    };

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      errors: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
