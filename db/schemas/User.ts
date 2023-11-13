import { Schema } from "mongoose";
require("./FavMovie")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 25,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100,
    },
    favMovies: [{
        type: Schema.Types.ObjectId,
        ref: "FavMovie",
        default: [],
    }]
},
    { timestamps: true })

export default userSchema