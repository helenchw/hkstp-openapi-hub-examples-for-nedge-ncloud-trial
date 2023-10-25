const { CopyObjectCommand } = require("@aws-sdk/client-s3");
var MyUtils = require("./common.js");
var MyConfig = require("./config.js");

(async() => {

  const client = MyUtils.createS3Client();

  const input = {
    Bucket: MyConfig.test_obj.bucket,
    Key: MyConfig.test_obj.copied_name,
    CopySource: encodeURI(MyConfig.test_obj.bucket + "/" + MyConfig.test_obj.name)
  }

  const copyObjCmd = new CopyObjectCommand(input);

  try {
    const response = await client.send(copyObjCmd);
    console.log("===== Response =====\n", response, "\n==========");
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }

})();
