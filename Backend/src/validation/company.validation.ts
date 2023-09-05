import { string, number, object, array, any } from 'zod';

const projectForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    description: string().trim(),
  }),
});

const imageFileTypes = ['image/jpeg', 'image/png'];
const modelFileTypes = ['model/gltf-binary', 'application/octet-stream'];
const maxFileSize = 50 * 1024 * 1024;

const apartmentForm = object({
  files: array(
    object({
      fieldname: string().trim(),
      originalname: string().trim(),
      encoding: string().trim(),
      mimetype: string().trim(),
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
    description: string().trim(),
    projectId: string().trim(),
  }),
});

const panoramaForm = object({
  files: array(
    object({
      fieldname: string().trim(),
      originalname: string().trim(),
      encoding: string().trim(),
      mimetype: string().trim(),
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
    name: string().trim().min(1).max(18),
    description: string().trim(),
    projectId: string().trim(),
  }),
});

export { projectForm, apartmentForm, panoramaForm };
