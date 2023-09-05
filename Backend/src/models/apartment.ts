import { Schema, model, Document } from 'mongoose';
import { PanoramaSchema, IPanoramaDocument } from './panorama';

interface IApartment {
  name: string;
  description: string;
  url?: string;
  panoramas?: IPanoramaDocument[];
}
interface IApartmentDocument extends IApartment, Document {}

const ApartmentSchema = new Schema<IApartment>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  panoramas: [PanoramaSchema],
});

const Apartment = model<IApartmentDocument>('Apartment', ApartmentSchema);

export { IApartment, IApartmentDocument, ApartmentSchema, Apartment };
