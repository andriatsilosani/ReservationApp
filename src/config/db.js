import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const dataBaseURL = process.env.DATABASE_URL
const connectDB = async () => {
    try {
        await mongoose.connect(dataBaseURL)
        console.log(chalk.cyan.bold('MongoDb connected'))
    } catch (err) {
        console.error(chalk.red('MongoDB connection failed:', err.message))
        process.exit(1)
    }
}

export default connectDB