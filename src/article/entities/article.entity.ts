import { Schema } from 'mongoose';

const NarrativeSchema = new Schema({
    text: { type: String, required: true },
    category: { type: String },
    dominanceScore: { type: Number },
});

export const ArticleSchema = new Schema({
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    narratives: Object,
    dominance: Object,
    evolution: String,
    research: { type: Schema.Types.ObjectId, ref: 'Research' },
    title: String,
    author: { type: String },
    source: String,
    datePublished: { type: Date, required: true },
    content: String,
    description: String,
    url: String,
    // narratives: NarrativeSchema,
    summary: { type: String },
    createdAt: { type: Date, default: new Date()},
    updatedAt: { type: Date, default: new Date()},
});
