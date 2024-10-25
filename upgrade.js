#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to update or create package.json with required fields
function ensurePackageJson() {
  if (!fs.existsSync('package.json')) {
    console.log('No package.json found. Initializing a new one...');
    execSync('npm init -y', { stdio: 'inherit' });
  }

  // Read package.json data
  const packagePath = path.resolve('package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  // Define additional fields
  const additionalFields = {
    name: path.basename(process.cwd()), // Use current directory name
    version: '1.0.0',
    description: 'WordPress project with Webpack for asset management',
    main: 'webpack.config.js',
    scripts: {
      build: 'webpack --config webpack.config.js',
      watch: 'webpack --watch --config webpack.config.js',
      'create-block': 'node createBlock.js'
    },
    author: 'E11 Group',
    license: 'ISC'
  };

  // Merge additional fields into package.json data, preserving existing values
  Object.entries(additionalFields).forEach(([key, value]) => {
    if (!packageData[key]) {
      packageData[key] = value;
    }
  });

  // Write updated package.json data back to file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  console.log('✔ package.json updated with custom fields.');
}

// Ensure package.json exists and has the required fields
ensurePackageJson();

// Check if node_modules exists; install dependencies if missing
if (!fs.existsSync('node_modules')) {
  console.log('Installing necessary packages...');
  execSync(
    'npm install @inquirer/prompts autoprefixer css-loader glob mini-css-extract-plugin postcss-loader sass sass-loader terser webpack webpack-cli webpack-concat-files-plugin',
    { stdio: 'inherit' }
  );
  console.log('✔ Dependencies installed successfully.');
}

// Step to download, run, and delete setup-webpack.js
console.log('Downloading setup-webpack.js...');
execSync(
  'curl -s -o setup-webpack.js https://raw.githubusercontent.com/E11-Group/gulp-to-webpack/main/setup-webpack.js',
  { stdio: 'inherit' }
);

// Execute setup-webpack.js
console.log('Running setup-webpack.js...');
execSync('node setup-webpack.js', { stdio: 'inherit' });

// Delete setup-webpack.js after execution
fs.unlinkSync('setup-webpack.js');
console.log('✔ setup-webpack.js deleted after execution.');