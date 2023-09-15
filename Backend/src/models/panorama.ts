import { Schema, model, Document } from 'mongoose';
import { MarkerSchema, IMarkerDocument } from './marker';
import { HotspotSchema, IHotspotDocument } from './hotspot';

interface IPanorama {
  name?: string;
  url: string;
  marker?: IMarkerDocument;
  hotspots?: IHotspotDocument[];
}

interface IPanoramaDocument extends IPanorama, Document {}

const PanoramaSchema = new Schema<IPanorama>({
  name: { type: String },
  url: { type: String, required: true },
  marker: MarkerSchema,
  hotspots: [HotspotSchema],
});

const Panorama = model<IPanoramaDocument>('Panorama', PanoramaSchema);

export { IPanorama, IPanoramaDocument, PanoramaSchema, Panorama };
