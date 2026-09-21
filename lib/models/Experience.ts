import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

const experienceSchema = new Schema(
  {
    // Free-text display range, e.g. "2025 – Present". Kept as a string to
    // match the existing UI exactly; sort order is controlled separately
    // via `order` since ranges like this aren't reliably sortable as text.
    period: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, required: true, trim: true, maxlength: 160 },
    org: { type: String, required: true, trim: true, maxlength: 160 },
    desc: { type: String, required: true, trim: true, maxlength: 2000 },
    // 'work' renders the "Work" badge, 'edu' renders the "Education" badge.
    type: { type: String, required: true, enum: ['work', 'edu'] },
    // Lower numbers appear first (most recent first, matching the existing
    // hardcoded ordering).
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });
experienceSchema.index({ type: 1 });

export type ExperienceDocument = InferSchemaType<typeof experienceSchema>;

export const Experience: Model<ExperienceDocument> =
  (models.Experience as Model<ExperienceDocument>) ||
  model<ExperienceDocument>('Experience', experienceSchema);

export default Experience;
