const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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
    Key: MyConfig.test_obj.name,
    Body: "hello world, this is an example."
  }

  const putObjCmd = new PutObjectCommand(input);

  try {
    const response = await client.send(putObjCmd);
    console.log("===== Response =====\n", response, "\n==========");
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }

})();
