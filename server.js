import express from "express";
import chalk from "chalk";
import connectDB from "./src/config/db.js";
import authUserRoutes from "./src/auth/user/routes/auth.routes.js";
import adminRoutes from "./src/user/admin/routes/user/admin.routes.js";
import clientRoutes from "./src/user/client/routes/user/client.routes.js";
import courtAdminRoutes from "./src/user/admin/routes/court/court.routes.js";
import bookingRoutes from "./src/user/client/routes/reservation/reservation.routes.js";
import reservationAdminRoutes from "./src/user/admin/routes/reservation/reservation.routes.js";
import authCompanyRoutes from "./src/auth/company/routes/auth.routes.js";
import courtAuthorRoutes from "./src/user/author/routes/courts/court.routes.js";
import companyAuthorRoutes from "./src/user/author/routes/company/company.routes.js";
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
app.use("/auth/user", authUserRoutes);
app.use("/auth/company", authCompanyRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", clientRoutes);
app.use("/company/court", courtAuthorRoutes);
app.use("/company", companyAuthorRoutes);

app.listen(port, () => {
    console.log(chalk.green(`App listening on port ${port}`));
});
