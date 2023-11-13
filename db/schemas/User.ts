import { Schema } from "mongoose";
require("./Movie")

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
        ref: "Movie",
        default: [],
    }]
},
    { timestamps: true })

export default userSchema