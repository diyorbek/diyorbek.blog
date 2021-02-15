import { NextApiRequest, NextApiResponse } from 'next';
import S3, { PutObjectRequest, ManagedUpload, Body } from 'aws-sdk/clients/s3';
import * as uuid from 'uuid';
import { createReadStream } from 'fs';
import formidable, { File } from 'formidable';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function uploadFile(body: Body) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid.v4()}.jpg`,
    Body: body,
  } as PutObjectRequest;

  return new Promise<ManagedUpload.SendData>((resolve, reject) => {
    s3.upload(params, (error: Error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
}

function parseFormImage(req: NextApiRequest) {
  return new Promise<File>((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (error, _fields, files) => {
      if (error) {
        reject(error);
      } else {
        console.log(_fields);

        resolve(files.image as File);
      }
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const image = await parseFormImage(req);
      const { Location } = await uploadFile(createReadStream(image.path));

      res.status(200).json({ data: Location });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
