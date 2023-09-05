import { Schema, model, Document } from 'mongoose';

type Marker = { imageUrl: string; x: number; y: number; z: number };
type Hotspot = { text?: string; link?: string; yaw: number; pitch: number };

interface IPanorama {
  url: string;
  markers?: Marker[];
  hotspots?: Hotspot[];
}

interface IPanoramaDocument extends IPanorama, Document {}

const PanoramaSchema = new Schema<IPanorama>({
  url: { type: String, required: true },
  markers: [{ imageUrl: String, x: Number, y: Number, z: Number }],
  hotspots: [{ text: String, link: String, yaw: Number, pitch: Number }],
});

const Panorama = model<IPanoramaDocument>('Panorama', PanoramaSchema);

export { IPanorama, IPanoramaDocument, PanoramaSchema, Panorama };
