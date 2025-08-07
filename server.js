import express from "express";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/auth/routes/auth.routes.js";
import adminRoutes from "./src/admin/routes/user/admin.routes.js";
import clientRoutes from "./src/client/routes/user/client.routes.js";
import courtAdminRoutes from "./src/admin/routes/court/court.routes.js";
import bookingRoutes from "./src/client/routes/reservation/reservation.routes.js";
import reservationAdminRoutes from "./src/admin/routes/reservation/reservation.routes.js";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
connectDB();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.use(morgan("dev"));

app.use("/admin/court/reservaiton", reservationAdminRoutes);
app.use("/admin/court", courtAdminRoutes);
app.use("/court/reservation", bookingRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", clientRoutes);

app.listen(port, () => {
    console.log(chalk.green(`App listening on port ${port}`));
});
