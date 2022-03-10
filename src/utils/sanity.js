const sanityClient = require('@sanity/client');

const baseSettings = {
  projectId: 'b5y7zctp',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
};

const client = new sanityClient({
  ...baseSettings,
  token: process.env.SANITY_PREVIEW_TOKEN
});

module.exports = client
