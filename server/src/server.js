import express from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes";
import connectDB from "./config/connectDB"
require('dotenv').config()

const app = express()

app.use(cors());
connectDB.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app)
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});