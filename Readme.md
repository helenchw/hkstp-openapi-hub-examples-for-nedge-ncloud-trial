# Client usage examples for S3 service via OpenAPI Hub

This repository provides the example code for using an S3 service behind an OpenAPI Hub, e.g., HKSTP OpenAPI Hub.

The example code requires a valid OpenAPI authentication token, as well as valid AWS S3 credentials set in a shared credential file.

A general guide on the setup and format of the file is available [here](https://docs.aws.amazon.com/sdkref/latest/guide/file-format.html).

Below are the steps for Ubuntu 22.04:

1. Install the AWS client
   ```bash
   sudo apt install -y awscli
   ```
1. Configure the credentials
   ```bash
   aws configure
   ```
   Input the key ID, secret key, and storage region for the S3 storage service.
