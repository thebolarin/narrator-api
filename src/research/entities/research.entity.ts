import { Schema } from 'mongoose';

export const ResearchSchema = new Schema({
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    uniqueId: String,
    text: String,
    conclusion: String,
	statistics: Object,
    startDate: Date,
    endDate: Date,
    createdAt: { type: Date, default: new Date()},
    updatedAt: { type: Date, default: new Date()},
});
