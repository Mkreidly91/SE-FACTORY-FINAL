import {
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import envConfig from '../configs/env.config';
// function getUrlFromBucket(s3Bucket: any, fileName: string) {
//   const {
//     config: { params, region },
//   } = s3Bucket;
//   const regionString = region.includes('us-east-1') ? '' : '-' + region;
//   return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`;
// }
function getFileUrl(fileName: string) {
  return `https://${envConfig.BUCKET_NAME}s3.${envConfig.BUCKET_REGION}.amazonaws.com/${fileName}`;
}

const s3 = new S3Client({
  region: envConfig.BUCKET_REGION,
});

const checkBucket = async (bucket: string) => {
  const res = await s3.send(
    new HeadBucketCommand({ Bucket: envConfig.BUCKET_NAME })
  );
};

const upload = async (fileData: Express.Multer.File) => {
  const params = {
    Bucket: envConfig.BUCKET_NAME,
    Key: fileData.originalname,
    Body: fileData.buffer,
  };
  const res = await s3.send(new PutObjectCommand(params));

  return getFileUrl(params.Key);
};

const deleteFileService = async (key: string) => {
  const params = {
    Bucket: envConfig.BUCKET_NAME,
    Key: key,
  };

  const response = await s3.send(new DeleteObjectCommand(params));

  return response && response.$metadata.httpStatusCode === 204;
};

export { getFileUrl, checkBucket, upload, deleteFileService };
