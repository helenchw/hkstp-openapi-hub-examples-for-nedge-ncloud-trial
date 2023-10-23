const { ListObjectsCommand } = require("@aws-sdk/client-s3");
var MyUtils = require("./common.js");
var MyConfig = require("./config.js");

(async() => {

  const client = MyUtils.createS3Client();

  const input = {
    Bucket: MyConfig.test_obj.bucket,
  }

  const listObjsCmd = new ListObjectsCommand(input);

  try {
    const response = await client.send(listObjsCmd);
    console.log("===== Response =====\n", response, "\n==========");
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }

})();
