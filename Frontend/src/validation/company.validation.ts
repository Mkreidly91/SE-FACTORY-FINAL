import { z, string, number, object, array, any } from 'zod';

const projectFormSchema = object({
  name: string().trim().max(18).nonempty('Name field is required'),
  description: string().trim().nonempty('Description field is required'),
  location: string().trim().nonempty('Location field is required'),
  bedrooms: number().positive('Please provide a valid number'),
  bathrooms: number().positive('Please provide a valid number'),
  size: number().positive('Please provide a valid number'),
  price: number().positive('Please provide a valid number'),
  features: array(string()).optional().default([]),
  file: z.union([
    any().refine((files) => files?.length === 1, 'No image selected'),
    string().trim().url(),
  ]),
});

const imageFileTypes = ['image/jpeg', 'image/png'];
const modelFileTypes = ['model/gltf-binary', 'application/octet-stream'];
const maxFileSize = 50 * 1024 * 1024;

const apartmentForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim().nonempty(),
    projectId: string().trim().nonempty(),
  }),
  files: array(
    object({
      fieldname: string().trim().nonempty(),
      originalname: string().trim().nonempty(),
      encoding: string().trim().nonempty(),
      mimetype: string().trim().nonempty(),
      buffer: any(),
      size: number(),
    })
  )
    .refine(
      (files) => {
        return files.length > 0;
      },
      {
        message: 'Files array must not be empty',
      }
    )
    .refine(
      (files) => {
        return files.every(
          (file) =>
            modelFileTypes.includes(file.mimetype) &&
            file.originalname.trim().endsWith('.glb')
        );
      },
      {
        message: 'Invalid file type. File type must be glb.',
      }
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= maxFileSize);
      },
      {
        message: `File size must not exceed ${maxFileSize / (1024 * 1024)}MB.`,
      }
    ),
});

const panoramaForm = object({
  files: array(
    object({
      fieldname: string().trim().nonempty(),
      originalname: string().trim().nonempty(),
      encoding: string().trim().nonempty(),
      mimetype: string().trim().nonempty(),
      buffer: any(),
      size: number(),
    })
  )
    .refine(
      (files) => {
        return files.length > 0;
      },
      {
        message: 'Files array must not be empty',
      }
    )
    .refine(
      (files) => {
        return files.every((file) => imageFileTypes.includes(file.mimetype));
      },
      {
        message: 'Invalid file type. Supported file types are JPEG and PNG.',
      }
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= maxFileSize);
      },
      {
        message: `File size must not exceed ${maxFileSize / (1024 * 1024)}MB.`,
      }
    ),
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
  }),
});

const markerForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    x: number(),
    y: number(),
    z: number(),
  }),
});

const hotspotForm = object({
  link: string().trim().url().nonempty().optional(),
  info: string().trim().optional(),
  // yaw: number(),
  // pitch: number(),
});

const deleteProjectForm = object({
  body: object({
    projectId: string().trim().nonempty(),
  }),
});

const deleteApartmentForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
  }),
});

const deletePanoramaOrMarkerForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
  }),
});

const deleteHotspotForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    hotspotId: string().trim().nonempty(),
  }),
});

export type ProjectFormSchemaType = z.infer<typeof projectFormSchema>;
export type HotspotSchemaType = z.infer<typeof hotspotForm>;

export {
  projectFormSchema,
  apartmentForm,
  panoramaForm,
  markerForm,
  hotspotForm,
  deleteProjectForm,
  deleteApartmentForm,
  deletePanoramaOrMarkerForm,
  deleteHotspotForm,
};
