const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
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
  }

  const listObjsCmd = new ListObjectsCommand(input);

  try {
    const response = await client.send(listObjsCmd);
    console.log(response);
  } catch (err) {
    console.log(err);
  }

})();
