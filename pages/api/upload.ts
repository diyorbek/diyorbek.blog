import { NextApiRequest, NextApiResponse } from 'next';
import S3, { PutObjectRequest, ManagedUpload, Body } from 'aws-sdk/clients/s3';
import * as uuid from 'uuid';
import { createReadStream } from 'fs';
import formidable, { File } from 'formidable';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
});

function uploadFile(body: Body) {
  const params = {
    Bucket: process.env.BUCKET_NAME_AWS,
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

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      try {
        const image = (await parseFormImage(req)) as File & { path: string };
        const { Location } = await uploadFile(createReadStream(image.path));

        res.status(200).json({ data: Location });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400);
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
