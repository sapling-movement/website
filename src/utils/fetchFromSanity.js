const client = require('../utils/sanity');
const { AssetCache } = require('@11ty/eleventy-cache-assets');

/**
 * @param {string} cache_id
 * @param {string} query 
 * @param {string} params 
 * @returns {Array}
 */

module.exports = async function(cache_id, query, params) {

  let _params = params;

  // exclude drafts if not in serverless env
  _params.includeDrafts = process.env.ELEVENTY_SERVERLESS ? true : '!(_id in path("drafts.**"))' 


  // if in preview environment, use authenticated client to include document drafts in fetch
  if (process.env.ELEVENTY_SERVERLESS || process.env.NO_CACHE) {
    // fetch from sanity, returns array
    return await client.fetch(query, _params);
  }

  // if not in preview enviroment, use cache
  let asset = new AssetCache(cache_id);

  // use cache if not older than 1d
  if(asset.isCacheValid('1d')) {
    return asset.getCachedValue();
  }

  // otherwise make a new fetch request
  const response = await client.fetch(query, _params);
  await asset.save(response, "json");
  return response;
}
