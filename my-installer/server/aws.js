const AWS = require("aws-sdk");

AWS_ACCESS_KEY_ID = "123456789012";
AWS_REGION = "ap-southeast-1";
AWS_SECRET_ACCESS_KEY = "LSIATestAccount";
AWS_BUCKET = "installer-images";

const config_params = {
  region: AWS_REGION,
  endpoint: "http://s3.ap-southeast-1.localhost.localstack.cloud:4566",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  credentialSource: "EcsTaskDefinition",
  // s3ForcePathStyle: true,
};

const config = new AWS.Config();
config.update(config_params);
const s3 = new AWS.S3(config);

const uploadFile = ({ file }) => {
  return new Promise(async (resolve, reject) => {
    let location;
    try {
      const Key = file.originalname;
      console.log(Key);
      const params = {
        Bucket: AWS_BUCKET,
        Key,
        Body: file.buffer,
      };
      const data = await s3.upload(params).promise();
      location = data.Location;
      console.log("File uploaded to", location);
      resolve(location);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteFile = (fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("recieved", fileName);
      const params = {
        Bucket: AWS_BUCKET,
        Key: fileName,
      };
      const data = await s3.deleteObject(params).promise();
      //this doesn't return anything
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { uploadFile, deleteFile };
