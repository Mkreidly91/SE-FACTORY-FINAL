import { Schema, model, Document } from 'mongoose';

interface IHotspot {
  info?: string;
  link?: string;
  yaw: number;
  pitch: number;
}

interface IHotspotDocument extends IHotspot, Document {}

const HotspotSchema = new Schema<IHotspot>({
  info: String,
  link: String,
  yaw: { type: Number, required: true },
  pitch: { type: Number, required: true },
});

const Hotspot = model<IHotspotDocument>('Hotspot', HotspotSchema);

export { IHotspot, IHotspotDocument, HotspotSchema, Hotspot };
