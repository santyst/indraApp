const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const webpackConfig = process.env.IONIC_ENV || 'dev';
const env = require('minimist')(process.argv.slice(2)).env;

console.log(chalk.yellow.bgBlack('\nUsing ' + (!env ? 'DEFAULT' : env.toUpperCase()) + ' environment variables for ' + webpackConfig.toUpperCase() + ' build.\n'));

useDefaultConfig[env].resolve.alias = {
  "@app": path.resolve('./src/app/'),
  "@assets": path.resolve('./src/assets/'),
  "@env": path.resolve(environmentPath(env)),
  "@pages": path.resolve('./src/app/pages/'),
  "@services": path.resolve('./src/app/services/'),
  "@theme": path.resolve('./src/theme/'),
  "@models": path.resolve('./src/app/models/'),
  "@constantsAPP": path.resolve('src/app/configs/constants.ts'),
  "@components": ['src/app/components/']
};

function environmentPath(env) {
  envFileName = 'environment' + (!env ? '' : '.' + env) + '.ts';

  let filePath = './src/environments/' + envFileName;

  console.log(chalk.yellow.bgBlack('Loading ' + filePath + '\n'));

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
