import { S3 } from 'aws-sdk';
import { Request, Response, NextFunction } from 'express';
import envConfig from '../configs/env.config';
import { S3Client } from '@aws-sdk/client-s3';
import { deleteFile, upload } from '../helpers/s3.helpers';

const uploadToS3 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const s3 = new S3Client({
      region: envConfig.BUCKET_REGION,
    });

    const files = Object.values(req.files);
    if (!files) {
      return res.status(500).json({ message: 'File not found' });
    }

    const storageRes = await upload(files[0]);
    return res.status(200).json({ message: 'Success', data: storageRes });
  } catch (error) {
    next(error);
  }
};

const deleteFromS3 = async (req: Request, res: Response) => {
  const s3 = new S3Client({
    region: envConfig.BUCKET_REGION,
  });

  const file = req.body.key;
  if (!file) {
    return res.status(500).json({ success: false, message: 'key not found' });
  }
  const deleteRes = await deleteFile(file);
  //   if (success) {
  //     return res.status(200).json({ success, message });
  //   } else {
  //     return res.status(500).json({ success, message });
  //   }
};

export { uploadToS3, deleteFromS3 };
