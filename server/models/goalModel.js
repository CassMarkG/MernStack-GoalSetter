import mongoose from "mongoose";

export const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    },{
        timestamps:true,
    }
)

var GoalSchema = mongoose.model('Goal', goalSchema);

export default GoalSchema;