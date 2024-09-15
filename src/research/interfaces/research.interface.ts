import { Document, ObjectId } from 'mongoose';

export interface Research extends Document {
	project: ObjectId;
	uniqueId: String;
	text: String;
	conclusion: String;
	statistics: String;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
