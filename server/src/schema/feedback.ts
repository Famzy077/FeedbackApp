import { Schema, model } from "mongoose";

export interface IFeedback {
    rating: string,
    comment: string
}

const feedbackSchema = new Schema<IFeedback>({
    rating: {type: String, required: true},
    comment: {type: String}
})

export const Feedback = model<IFeedback>('Feedback', feedbackSchema)