import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please add a name'],
    },
    email: {
        type: String,
        required:[true, 'Please add an email address'],
        unique:true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
},{
    timestamps:true,
})

var needat = mongoose.model('User', userSchema);

export default needat;