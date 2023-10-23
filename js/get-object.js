const { GetObjectCommand } = require("@aws-sdk/client-s3");
var MyUtils = require("./common.js");
var MyConfig = require("./config.js");

(async() => {

  const client = MyUtils.createS3Client();

  const input = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.name
  };

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
