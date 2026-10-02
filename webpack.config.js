// const path = require('path');
// const fs = require('fs');

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findHubletoAppsInRepository(folder) {
  let apps = [];
  if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
    fs.readdirSync(folder).forEach(function(app) {
      const stat = fs.statSync(folder + '/' + app);
      const manifestFile = folder + '/' + app + '/manifest.yaml';
      const loaderEntry = folder + '/' + app + '/Loader';

      if (
        stat
        && stat.isDirectory()
        && fs.existsSync(manifestFile)
        && fs.existsSync(loaderEntry + '.tsx')
      ) {
        apps.push(loaderEntry);
      }
    });
  }

  return apps;
}

let communityApps = findHubletoAppsInRepository(path.resolve(__dirname, 'vendor/hubleto/erp/apps'))
let customApps = findHubletoAppsInRepository(path.resolve(__dirname, 'src/apps'))

let externalApps = [];

const vendorFolder = path.resolve(__dirname, 'vendor');
if (fs.existsSync(vendorFolder) && fs.lstatSync(vendorFolder).isDirectory()) {
  fs.readdirSync(vendorFolder).forEach(function(vendor) {
    if (vendor === 'hubleto') return;

    const vendorVendorFolder = path.resolve(vendorFolder, vendor);

    if (fs.existsSync(vendorVendorFolder) && fs.lstatSync(vendorVendorFolder).isDirectory()) {
      fs.readdirSync(vendorVendorFolder).forEach(function(app) {
        externalApps = [
          ...externalApps,
          ...findHubletoAppsInRepository(path.resolve(vendorFolder, vendor, app))
        ];
      });
    }
  });
}

console.log('Found ' + communityApps.length + ' community apps.');
console.log('Found ' + customApps.length + ' custom apps.');
console.log('Found ' + externalApps.length + ' external apps.');

export default {
  entry: {
    main: [
      './src/Main',
      ...communityApps,
      ...customApps
    ],
  },
  output: {
    path: path.resolve(__dirname, 'assets/compiled/js'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        apps: {
          test: /[\\/]apps[\\/]/,
          name: 'apps',
          chunks: 'all'
        },
        react_ui_core: {
          test: /[\\/]react-ui[\\/]/,
          name: 'react-ui',
          chunks: 'all'
        },
        react_ui_vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'modules',
          chunks: 'all'
        },
      }
    },
  },
  resolve: {
    // modules: [
    //   path.resolve(__dirname, './node_modules'),
    // ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
      // '@hubleto/react-ui': path.resolve(__dirname, 'vendor/hubleto/react-ui'),
      '@hubleto/apps': path.resolve(__dirname, 'vendor/hubleto/erp/apps'),
    },
  }
};
