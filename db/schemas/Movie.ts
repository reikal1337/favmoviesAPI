import { Schema } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    imageURL: {
        type: String,
        required: true,
    },
    imbURL: {
        type: String,

    },
    description: {
        type: String,
        min: 5,
        max: 200,
    },

    
},
{ timestamps: true })

export default movieSchema