const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Add custom web configuration
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@apollo/client', 'graphql']
      }
    },
    argv
  );

  // Suppress CSS compatibility warnings
  if (config.module && config.module.rules) {
    config.module.rules.forEach(rule => {
      if (rule.use) {
        rule.use.forEach(loader => {
          if (loader.loader && loader.loader.includes('css-loader')) {
            loader.options = {
              ...loader.options,
              // Suppress CSS warnings
              url: false,
              import: false
            };
          }
        });
      }
    });
  }

  return config;
};