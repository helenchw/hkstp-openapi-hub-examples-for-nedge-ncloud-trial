# Examples in Javascript

## Setup

1. Install `nodejs` on your system

1. Install the node packages
```bash
npm init
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
