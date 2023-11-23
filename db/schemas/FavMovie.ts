import { Schema } from "mongoose";

const favMovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    imageURL: {
        type: String,
        minLength: 5,
        maxLength: 200,
        required: true,
    },
    imdbURL: {
        type: String,
        minLength: 5,
        maxLength: 200,

    },
    description: {
        type: String,
        min: 1,
        max: 250,
    },

    
},
{ timestamps: true})

export default favMovieSchema