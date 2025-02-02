import express from "express";
import weatherController from "../controller/weather-controller.js";

export const router = express.Router();

router.get("/weather", weatherController.get);
