const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

const plugins = [
  // other plugins...
  // {
  //   resolve: `medusa-source-shopify`,
  //   options: {
  //     domain: process.env.SHOPIFY_STORE_URL,
  //     password: process.env.SHOPIFY_API_KEY,
  //   },
  // },
  // {
  //   resolve: `medusa-source-magento`,
  //   //if your plugin has configurations
  //   options: {
  //     magento_url: process.env.MAGENTO_URL,
  //     consumer_key: process.env.CONSUMER_KEY,
  //     consumer_secret: process.env.CONSUMER_SECRET,
  //     access_token: process.env.ACCESS_TOKEN,
  //     access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  //   },
  // },
  // {
  //   resolve: `medusa-plugin-meilisearch`,
  //   options: {
  //     // config object passed when creating an instance
  //     // of the MeiliSearch client
  //     config: {
  //       host: process.env.HOST_MEILISEARCH,
  //       apiKey: process.env.API_KEY_MEILISEARCH,
  //     },
  //     settings: {
  //       // index name
  //       products: {
  //         // MeiliSearch's setting options 
  //         // to be set on a particular index
  //         searchableAttributes: [
  //           "title", 
  //           "description",
  //           "variant_sku",
  //         ],
  //         displayedAttributes: [
  //           "title", 
  //           "description", 
  //           "variant_sku", 
  //           "thumbnail", 
  //           "handle",
  //         ],
  //       },
  //     },
  //   },
  // },
];
/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    redis_url: process.env.REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: process.env.DATABASE_URL,
    database_type: process.env.DATABAE_TYPE,
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
  },
  plugins,
};

