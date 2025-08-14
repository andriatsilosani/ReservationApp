import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    location: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    courtNum: {
        type: Number,
        default: 0,
        min: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
