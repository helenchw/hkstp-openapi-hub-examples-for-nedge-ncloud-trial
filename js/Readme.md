# Examples in Javascript

Examples on different storage operations:

- Put an object: `put-object.js`
- Get an object: `get-object.js`
- Head an object: `head-object.js`
- Delete an object: `delete-object.js`
- Copy an object: `copy-object.js`
- List objects in a bucket: `list-objects.js`

## Setup

1. Install `Node.js` (e.g., download the binaries from [here](https://nodejs.org/en/download) or install via the package manager according to the guide [here](https://nodejs.org/en/download/package-manager))

1. Install the required Node packages
   ```bash
   npm install
   ```

1. Fill out the HKSTP OpenAPI Hub endpoint (gateway address) and API key in `config.js`
   ```js
   module.exports = {
     hkstp: {
       endpoint: <HKSTP OpenAPI Hub endpoint>,
       apiKey: <API key>
     },
     ...
   }
   ```

1. Set up your object storage service credentials in the shared file (see the [Readme here](../Readme.md))

## Run

1. Execute an operation, e.g. put an object,
   ```bash
   node put-object.js
   ```
