import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "../route/route.js";

export const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);
