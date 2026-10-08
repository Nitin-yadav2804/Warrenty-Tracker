import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },
    name: {
        type: String,
        required: [true, 'Device name is required'],
        trim: true,
        maxlength: 100,
    },
    brand: {
        type: String,
        required: [true, 'Device brand is required'],
        trim: true,
        maxlength: 100,
    },
    category: {
        type: String,
        required: [true, 'Device category is required'],
        trim: true,
        maxlength: 100,
    },
    purchaseDate: {
        type: Date,
        required: [true, 'Device purchase date is required'],
    },
    warrantyEndDate: {
        type: Date,
        required: [true, 'Device warranty end date is required'],
        validate: {
            validator(value) {
                return value >= this.purchaseDate;
            },
            message: 'Warranty end date must be greater than or equal to purchase date',
        }
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 200,
        default: '',
    }
}, {
    timestamps: true,
});

deviceSchema.index({ userId: 1, createdAt: -1 });

export const Device = mongoose.model('Device', deviceSchema);