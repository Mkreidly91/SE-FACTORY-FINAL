import { Schema, model, Document } from 'mongoose';

interface IMarker {
  x: number;
  y: number;
  z: number;
}

interface IMarkerDocument extends IMarker, Document {}

const MarkerSchema = new Schema<IMarker>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

const Marker = model<IMarkerDocument>('Marker', MarkerSchema);

export { IMarker, IMarkerDocument, MarkerSchema, Marker };
