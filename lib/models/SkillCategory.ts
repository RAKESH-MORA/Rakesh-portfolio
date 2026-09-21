import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

const skillCategorySchema = new Schema(
  {
    // e.g. "Frontend", "Backend", "Databases" — one document per section
    // shown on the Skills page/section.
    cat: { type: String, required: true, trim: true, unique: true, maxlength: 60 },
    // Single-character glyph used as the section icon in the current UI.
    icon: { type: String, required: true, trim: true, maxlength: 8 },
    // Hex color used to tint the icon, e.g. "#4f9cf9".
    color: {
      type: String,
      required: true,
      trim: true,
      match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'color must be a hex color, e.g. #4f9cf9'],
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0 && arr.every((s) => typeof s === 'string' && s.trim().length > 0),
        message: 'skills must be a non-empty list of non-empty strings',
      },
    },
    // Controls display order on both the homepage (first 4 shown) and the
    // full /skills page. Lower numbers appear first.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

skillCategorySchema.index({ order: 1 });

export type SkillCategoryDocument = InferSchemaType<typeof skillCategorySchema>;

export const SkillCategory: Model<SkillCategoryDocument> =
  (models.SkillCategory as Model<SkillCategoryDocument>) ||
  model<SkillCategoryDocument>('SkillCategory', skillCategorySchema);

export default SkillCategory;
