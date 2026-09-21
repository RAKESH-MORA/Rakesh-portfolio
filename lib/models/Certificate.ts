import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

const certificateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    org: { type: String, required: true, trim: true, maxlength: 160 },
    // Free-text display date, e.g. "May 2026", matching the existing UI.
    date: { type: String, required: true, trim: true, maxlength: 40 },
    // Optional verification / credential URL. Not currently rendered by the
    // UI, but stored so it's available if the design adds it later.
    link: { type: String, default: null, trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

certificateSchema.index({ order: 1 });

export type CertificateDocument = InferSchemaType<typeof certificateSchema>;

export const Certificate: Model<CertificateDocument> =
  (models.Certificate as Model<CertificateDocument>) ||
  model<CertificateDocument>('Certificate', certificateSchema);

export default Certificate;
