import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

const projectSchema = new Schema(
  {
    // Display index shown in the UI, e.g. "01". Kept as a string so leading
    // zeros are preserved exactly as designed.
    num: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    subtitle: { type: String, required: true, trim: true, maxlength: 240 },
    desc: { type: String, required: true, trim: true, maxlength: 2000 },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.every((t) => typeof t === 'string' && t.trim().length > 0),
        message: 'tags must be a list of non-empty strings',
      },
    },
    github: { type: String, required: true, trim: true },
    live: { type: String, default: null, trim: true },
    year: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    highlights: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.every((h) => typeof h === 'string' && h.trim().length > 0),
        message: 'highlights must be a list of non-empty strings',
      },
    },
    // Controls sort order across both the homepage (featured) and the full
    // /projects page. Lower numbers appear first.
    order: { type: Number, required: true, default: 0 },
    // Marks a project as eligible for the homepage "Featured Projects" list.
    featured: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ category: 1 });

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

// Reuse the compiled model across hot-reloads / serverless invocations
// instead of recompiling it (which Mongoose throws on).
export const Project: Model<ProjectDocument> =
  (models.Project as Model<ProjectDocument>) || model<ProjectDocument>('Project', projectSchema);

export default Project;
