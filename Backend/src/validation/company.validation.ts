import { string, number, object, array, any } from 'zod';

const thumbNailFileSize = 4 * 1024 * 1024;
const imageFileTypes = ['image/jpeg', 'image/png'];
const modelFileTypes = ['model/gltf-binary', 'application/octet-stream'];
const maxFileSize = 50 * 1024 * 1024;

const projectForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim().nonempty(),
    location: string().trim().nonempty(),
    features: array(string().trim().nonempty()).optional(),
    bedrooms: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    price: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    bathrooms: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    size: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
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
        return files.every((file) => imageFileTypes.includes(file.mimetype));
      },
      {
        message: 'Invalid file type. Supported file types are JPEG and PNG.',
      }
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= thumbNailFileSize);
      },
      {
        message: `File size must not exceed ${
          thumbNailFileSize / (1024 * 1024)
        }MB.`,
      }
    )
    .optional(),
});

const apartmentForm = object({
  body: object({
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
  body: object({
    projectId: string().trim().nonempty(),
    name: string().trim().nonempty().optional(),
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
});

const markerForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    x: number(),
    y: number(),
    z: number(),
  }),
});

const hotspotForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    link: string().trim().nonempty().optional(),
    info: string().trim().nonempty().optional(),
    yaw: number(),
    pitch: number(),
  }),
});

const deleteProjectForm = object({
  body: object({
    projectId: string().trim().nonempty(),
  }),
});

const deletePanoramaOrMarkerForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
  }),
});

const deleteHotspotForm = object({
  body: object({
    projectId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    hotspotId: string().trim().nonempty(),
  }),
});

const editProjectSchema = object({
  params: object({
    projectId: string().trim().nonempty(),
  }),
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim().nonempty(),
    location: string().trim().nonempty(),
    features: array(string().trim().nonempty()).optional(),
    bedrooms: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    price: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    bathrooms: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
    size: string()
      .trim()
      .nonempty()
      .transform((v) => parseInt(v)),
  }).partial(),
  files: array(
    object({
      fieldname: string().trim().nonempty(),
      originalname: string().trim().nonempty(),
      encoding: string().trim().nonempty(),
      mimetype: string().trim().nonempty(),
      buffer: any(),
      size: number(),
    })
  ).optional(),
}).partial();

export {
  projectForm,
  apartmentForm,
  panoramaForm,
  markerForm,
  hotspotForm,
  deleteProjectForm,
  deletePanoramaOrMarkerForm,
  deleteHotspotForm,
  editProjectSchema,
};
