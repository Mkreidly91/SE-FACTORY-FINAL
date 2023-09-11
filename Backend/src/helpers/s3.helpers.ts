import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import envConfig from '../configs/env.config';
import { v4 as uuidv4 } from 'uuid';

// function getUrlFromBucket(s3Bucket: any, fileName: string) {
//   const {
//     config: { params, region },
//   } = s3Bucket;
//   const regionString = region.includes('us-east-1') ? '' : '-' + region;
//   return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`;
// }
function getFileExtension(fileName: string) {
  return `${fileName.split('.').pop()}`;
}

function getFileUrl(fileName: string) {
  return `https://${envConfig.BUCKET_NAME}.s3.${envConfig.BUCKET_REGION}.amazonaws.com/${fileName}`;
}

function getFileNameFromUrl(url: string) {
  const pathParts = url.split('/');
  return pathParts[pathParts.length - 1];
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
    Key: `${uuidv4()}.${getFileExtension(fileData.originalname)}`,
    Body: fileData.buffer,
  };
  const res = await s3.send(new PutObjectCommand(params));

  return getFileUrl(params.Key);
};

const deleteFile = async (url: string) => {
  const key = getFileNameFromUrl(url);
  console.log(key);
  const params = {
    Bucket: envConfig.BUCKET_NAME,
    Key: key,
  };

  const response = await s3.send(new DeleteObjectCommand(params));

  return response && response.$metadata.httpStatusCode === 204;
};

const deleteBulk = async (urls: string[]) => {
  const objectsToDelete = urls.map((url) => ({ Key: getFileNameFromUrl(url) }));
  const params: DeleteObjectsCommandInput = {
    Bucket: envConfig.BUCKET_NAME,
    Delete: {
      Objects: objectsToDelete,
    },
  };

  const response = await s3.send(new DeleteObjectsCommand(params));

  return response && response.$metadata.httpStatusCode === 204;
};

export {
  getFileUrl,
  getFileNameFromUrl,
  checkBucket,
  upload,
  deleteFile,
  deleteBulk,
};
