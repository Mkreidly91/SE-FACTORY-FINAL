import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import { IApartment, ApartmentSchema, IApartmentDocument } from './apartment';

interface IProject {
  name: string;
  description: string;
  apartments?: IApartmentDocument[];
  owner: mongoose.Types.ObjectId;
}
interface IProjectDocument extends IProject, Document {}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  apartments: [ApartmentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Company' },
});

const Project = model<IProjectDocument>('Project', ProjectSchema);

export { IProjectDocument, IProject, Project };
