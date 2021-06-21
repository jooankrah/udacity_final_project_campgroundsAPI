const AWS = require("aws-sdk");

// Configure AWS
const credentials = new AWS.Credentials(
  process.env.AWS_KEY,
  process.env.AWS_SECRET
);
AWS.config.credentials = credentials;

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
  params: { Bucket: process.env.AWS_BUCKET },
});

// Generates an AWS signed URL for retrieving objects
function getGetSignedUrl(key) {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl("getObject", {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
function getPutSignedUrl(key) {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl("putObject", {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

module.exports = { getGetSignedUrl, getPutSignedUrl };
