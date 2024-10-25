#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('@inquirer/prompts');

async function setupWebpack() {
  const themesDir = path.resolve(process.cwd(), 'wp-content/themes');

  // Step 1: Verify /themes directory existence
  if (!fs.existsSync(themesDir) || !fs.readdirSync(themesDir).length) {
    console.error('Error: No themes directory found in /wp-content/themes or it is empty.');
    process.exit(1);
  }

  // Step 2: List themes and select one if multiple exist
  const themeDirs = fs.readdirSync(themesDir).filter((dir) =>
    fs.lstatSync(path.join(themesDir, dir)).isDirectory()
  );

  let chosenTheme;
  if (themeDirs.length === 1) {
    chosenTheme = themeDirs[0];
  } else {
    const themeChoice = await inquirer.select({
      message: 'Multiple themes found. Please select one to set up Webpack:',
      choices: themeDirs,
    });
    chosenTheme = themeChoice;
  }

  // Step 3: Load Webpack config, replace placeholder, and save to chosen theme
  const webpackTemplatePath = path.resolve(__dirname, 'webpack.config.js');
  const webpackConfigContent = fs
    .readFileSync(webpackTemplatePath, 'utf-8')
    .replace('<theme-name>', chosenTheme);
  
  fs.writeFileSync(path.resolve(process.cwd(), 'webpack.config.js'), webpackConfigContent);
  console.log('✔ Webpack config written to the root directory: webpack.config.js');

  // Step 4: Remove outdated files
  const filesToDelete = [
    path.join(themesDir, chosenTheme, 'gulpfile.js'),
    path.join(themesDir, chosenTheme, 'package.json'),
    path.join(themesDir, chosenTheme, 'package-lock.json'),
  ];

  filesToDelete.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
      console.log(`✔ Deleted: ${filePath}`);
    }
  });

  console.log('✔ Setup complete. Webpack config and dependencies are ready for use.');
}

// Run setupWebpack function
setupWebpack().catch((err) => {
  console.error('Error during setup:', err);
  process.exit(1);
});