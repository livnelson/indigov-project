import express from "express";
import bodyParser from "body-parser";
import { getAllConstituents, createConstituent, exportConstituents } from "./controllers/ConstituentController";

const app = express();
app.use(bodyParser.json());

app.get("/constituents", getAllConstituents);
app.post("/constituents", createConstituent);
app.get("/constituents/export", exportConstituents);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
