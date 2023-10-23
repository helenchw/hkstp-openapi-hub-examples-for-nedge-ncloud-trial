const { PutObjectCommand } = require("@aws-sdk/client-s3");
var MyUtils = require("./common.js");
var MyConfig = require("./config.js");

(async() => {

  const client = MyUtils.createS3Client();

  const input = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.name,
    Body: "hello world, this is an example."
  };

  const putObjCmd = new PutObjectCommand(input);

  try {
    const response = await client.send(putObjCmd);
    console.log("===== Response =====\n", response, "\n==========");
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }

})();
