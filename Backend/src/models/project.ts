import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import { IApartment, ApartmentSchema, IApartmentDocument } from './apartment';
import { IPanoramaDocument, PanoramaSchema } from './panorama';

interface IProject {
  name: string;
  description: string;
  location: string;
  thumbnail?: string;
  features?: string[];
  bedrooms: number;
  bathrooms: number;
  price: number;
  size: number;
  owner: mongoose.Types.ObjectId;
  url?: string;
  panoramas?: IPanoramaDocument[];
}
interface IProjectDocument extends IProject, Document {}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  features: [],
  thumbnail: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'Company' },
  url: { type: String },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  panoramas: [PanoramaSchema],
});
ProjectSchema.index({ name: 'text', description: 'text', location: 'text' });
const Project = model<IProjectDocument>('Project', ProjectSchema);

export { IProjectDocument, IProject, Project };
