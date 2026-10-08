import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false,
    }
}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);