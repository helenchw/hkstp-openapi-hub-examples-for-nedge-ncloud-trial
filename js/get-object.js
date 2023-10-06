const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
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
    Key: MyConfig.test_obj.name
  }

  const getObjCmd = new GetObjectCommand(input);

  try {
    const response = await client.send(getObjCmd);
    console.log("===== Response =====\n", response, "\n==========");
    try {
      const str = await response.Body.transformToString();
      console.log("===== Object content =====\n", str, "\n==========");
    } catch {
      console.log("===== Error =====", err, "\n==========");
    }
    // TODO wait and print the object content
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }

})();
