import express from "express";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import dotenv from "dotenv";

const app = express();
connectDB();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(chalk.green(`App listening on port ${port}`));
});
