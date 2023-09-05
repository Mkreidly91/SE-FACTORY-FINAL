import { string, number, object, array, any } from 'zod';

const projectForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim().nonempty(),
  }),
});

const imageFileTypes = ['image/jpeg', 'image/png'];
const modelFileTypes = ['model/gltf-binary', 'application/octet-stream'];
const maxFileSize = 50 * 1024 * 1024;

const apartmentForm = object({
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
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim().nonempty(),
    projectId: string().trim().nonempty(),
  }),
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
  body: object({
    projectId: string().trim().nonempty(),
    apartmentId: string().trim().nonempty(),
    panoramaId: string().trim().nonempty(),
    link: string().trim().url().nonempty().optional(),
    info: string().trim().nonempty().optional(),
    yaw: number(),
    pitch: number(),
  }),
});

export { projectForm, apartmentForm, panoramaForm, markerForm, hotspotForm };
