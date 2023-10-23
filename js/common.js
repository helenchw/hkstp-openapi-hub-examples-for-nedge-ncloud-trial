const { Agent } = require("https");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { S3Client } = require("@aws-sdk/client-s3");

const MyConfig = require("./config.js");

module.exports = {
  createS3Client: function () {

    // customize ssl cert checking
    const agent = new Agent({
       rejectUnauthorized: MyConfig.misc.check_ssl_cert
    });

    // create an S3 client instance
    const client = new S3Client({
      region: MyConfig.s3.region,
      endpoint: MyConfig.hkstp.endpoint,
      forcePathStyle: true,
      requestHandler: new NodeHttpHandler({ httpsAgent: agent }) 
    });

    // add hkstp credentials
    client.middlewareStack.add(
      (next, context) => (args) => {
        args.request.headers["X-OpenAPIHub-Key"] = MyConfig.hkstp.apiKey;
        return next(args);
      },
      {
        step: "add-openapi-hub-key",
      }
    );

    // return the created client
    return client;
  }
};
