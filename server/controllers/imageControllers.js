import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const postImage = async (req, res) => {
  const client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    },
  });

  const command = new CreatePresignedPostCommand({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 5242880], // up to 5 MB
    ],
    Fields: {
      key: req.query.file,
    },
  });

  const url = await client.send(command);

  res.status(200).json(url);
};
