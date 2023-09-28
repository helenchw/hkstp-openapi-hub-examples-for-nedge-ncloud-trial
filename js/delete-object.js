const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
var MyConfig = require("./config.js");

(async() => {

  const client = new S3Client({
    region: MyConfig.s3.region,
    endpoint: MyConfig.hkstp.endpoint,
    forcePathStyle: true
  });

  client.middlewareStack.add(
    (next, context) => (args) => {
      args.request.headers["X-OpenAPIHub-Key"] = MyConfig.hkstp.apiKey;
      return next(args);
    },
    {
      step: "add-openapi-hub-key",
    }
  );

  // delete the original object
  const input = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.name
  }

  const deleteObjCmd = new DeleteObjectCommand(input);

  try {
    const response = await client.send(deleteObjCmd);
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  // delete the copied object
  const input2 = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.copied_name
  }

  const deleteObjCmd2 = new DeleteObjectCommand(input2);

  try {
    const response = await client.send(deleteObjCmd2);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
})();
