import mongoose, { Schema, model, Document } from 'mongoose';

interface IHotspot {
  info?: string;
  link?: mongoose.Types.ObjectId;
  yaw: number;
  pitch: number;
}

interface IHotspotDocument extends IHotspot, Document {}

const HotspotSchema = new Schema<IHotspot>({
  info: String,
  link: [{ type: Schema.Types.ObjectId, ref: 'Panorama' }],
  yaw: { type: Number, required: true },
  pitch: { type: Number, required: true },
});

const Hotspot = model<IHotspotDocument>('Hotspot', HotspotSchema);

export { IHotspot, IHotspotDocument, HotspotSchema, Hotspot };
