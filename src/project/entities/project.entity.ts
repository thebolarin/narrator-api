import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, default: "Inactive" },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});
