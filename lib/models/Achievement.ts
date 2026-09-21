import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

const achievementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    // Free-text display date, e.g. "March 2025".
    date: { type: String, required: true, trim: true, maxlength: 40 },
    issuer: { type: String, default: null, trim: true, maxlength: 160 },
    link: { type: String, default: null, trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

achievementSchema.index({ order: 1 });

export type AchievementDocument = InferSchemaType<typeof achievementSchema>;

export const Achievement: Model<AchievementDocument> =
  (models.Achievement as Model<AchievementDocument>) ||
  model<AchievementDocument>('Achievement', achievementSchema);

export default Achievement;
