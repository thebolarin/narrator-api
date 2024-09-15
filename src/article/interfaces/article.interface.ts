import { Document, ObjectId } from 'mongoose';

export interface Article extends Document {
	project: ObjectId;
	title: String;
	author: String;
	source: String;
	narratives: Object,
    dominance: Object,
    evolution: String,
    datePublished: Date;
	description: String,
    url: String,
	content: Date;
	summary: String;
	createdAt: Date;
	updatedAt: Date;
}
