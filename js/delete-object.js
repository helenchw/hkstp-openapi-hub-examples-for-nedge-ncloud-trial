const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
var MyUtils = require("./common.js");
var MyConfig = require("./config.js");

(async() => {

  const client = MyUtils.createS3Client();

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
    console.log("===== Response =====\n", response, "\n==========");
  } catch (err) {
    console.log("===== Error =====", err, "\n==========");
  }
})();
