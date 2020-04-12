import { Schema } from 'mongoose';

export const ChatSchema = new Schema({
    users: {
        type: Array,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});