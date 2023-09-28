const { S3Client, CopyObjectCommand } = require("@aws-sdk/client-s3");
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

  const input = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.copied_name,
    CopySource: MyConfig.test_obj.bucket + "/" + MyConfig.test_obj.name
  }

  const copyObjCmd = new CopyObjectCommand(input);

  try {
    const response = await client.send(copyObjCmd);
    console.log(response);
  } catch (err) {
    console.log(err);
  }

})();
