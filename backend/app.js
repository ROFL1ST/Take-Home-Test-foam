import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createRequire } from "module";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
const require = createRequire(import.meta.url);
const db = require("./models/index.cjs");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(notFound);
app.use(errorHandler);

db.sequelize
    .authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.error(err));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({
        message: "Todo API Running",
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});