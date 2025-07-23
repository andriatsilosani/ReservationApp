import express from "express";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import adminRoutes from "./src/routes/user/admin/admin.routes.js";
import clientRoutes from "./src/routes/user/client/client.routes.js";
import courtAdminRoutes from "./src/routes/court/admin/court.routes.js";
import bookingRoutes from "./src/routes/reservation/client/reservation.routes.js";
import dotenv from "dotenv";

const app = express();
connectDB();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.use("/admin/courts", courtAdminRoutes);
app.use("/court/reservation", bookingRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", clientRoutes);

app.listen(port, () => {
    console.log(chalk.green(`App listening on port ${port}`));
});
