import { Document, ObjectId } from 'mongoose';

export interface Project extends Document {
    name: String;
    description: String;
    status: String;
    createdAt: Date;
    updatedAt: Date;
}