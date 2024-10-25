# Gulp to Webpack Upgrade Script

This repository provides a streamlined, one-step setup for converting WordPress projects from Gulp-based asset management to Webpack, with integrated Prettier, ESLint, and VSCode configuration files to maintain consistent formatting and linting across all team members’ environments.

## Overview

Running this setup will:

1. Install Webpack and related dependencies to handle SCSS and JavaScript minification/compilation, replacing the old Gulp workflow.
2. Create and configure a webpack.config.js file, tailored to your selected WordPress theme.
3. Set up ESLint and Prettier with default configurations for code formatting and linting.
4. Generate VSCode settings to enforce Prettier and ESLint formatting on save.
5. Clean up any legacy Gulp-related files within the chosen theme’s directory.

## Requirements

- **Node.js** and **npm** must be installed on your machine.
- **VSCode** (recommended for full functionality)
- **Prettier - Code formatter** extension for VSCode (needed to auto-format code on save)
- **ESLint** extension for VSCode (optional but recommended to see inline linting errors)

## Quick Start

To set up Webpack, Prettier, ESLint, and VSCode configurations, run the following command in the root of your WordPress project:

```
curl -O https://raw.githubusercontent.com/E11-Group/gulp-to-webpack/main/upgrade.js && node upgrade.js
```

## What This Script Does

1. **package.json Setup**: Initializes or updates package.json with essential fields and scripts for Webpack.
2. **Dependency Installation**: Installs Webpack, Prettier, ESLint, and related plugins.
3. **Configuration Files**:
   - **webpack.config.js**: Configures Webpack to handle SCSS and JavaScript minification and compilation.
   - **.prettierrc**: Sets default Prettier settings (e.g., single quotes, semi-colons).
   - **.eslintrc.json**: Configures ESLint to work with Prettier.
   - **.eslintignore**: Excludes node_modules from ESLint checks.
   - **.vscode/settings.json**: Sets up VSCode for Prettier and ESLint auto-formatting on save.
4. **Legacy Gulp Cleanup**: Deletes any gulpfile.js, package.json, and package-lock.json files in the selected theme directory.
5. **Self-Cleaning**: Removes downloaded setup scripts from the project after execution.

## Usage Details

### Step-by-Step Instructions

1. **Run the Setup**:
   - Execute the one-liner provided above. The script will:
     - Download upgrade.js to your project.
     - Run the setup, which:
       - Installs necessary dependencies.
       - Configures Webpack, Prettier, ESLint, and VSCode settings.
       - Cleans up legacy Gulp files.
     - Deletes the setup scripts when finished.
2. **Select Your Theme**:
   - If multiple themes are found in your WordPress project’s /wp-content/themes directory, the script will prompt you to select one.
   - The selected theme will be referenced in webpack.config.js.
3. **Review Configuration Files**:
   - Check the root of your project for .prettierrc, .eslintrc.json, and .vscode/settings.json. These files provide formatting and linting rules, integrated with VSCode for auto-formatting on save.

## Recommended VSCode Extensions

To ensure consistent code style, we recommend installing the following VSCode extensions:

- **Prettier - Code formatter** by esbenp
  - This extension allows VSCode to auto-format files using Prettier’s settings.
  - Make sure to enable formatOnSave in your user settings for automatic formatting.
- **ESLint** by dbaeumer
  - This extension highlights ESLint issues inline in VSCode and works with Prettier for linting and formatting.

## Customizing Configurations

If you’d like to customize any configuration settings:

- **Prettier**: Update .prettierrc to modify code style options, like semi, singleQuote, tabWidth, etc.
- **ESLint**: Edit .eslintrc.json to adjust rules, add plugins, or integrate with other JavaScript standards.
- **VSCode Settings**: Modify .vscode/settings.json if your team has specific formatting or linting needs.

**Note: before making any changes to the above files, discuss this with the team to make sure everyone is aligned**

## FAQ

**Does each team member need to install Prettier and ESLint in VSCode?**

Yes. To benefit from auto-formatting on save, each team member should install the Prettier and ESLint extensions in VSCode.

**What happens to my existing Gulp files?**

If gulpfile.js, package.json, or package-lock.json are found in the selected theme directory, they will be deleted by this setup script. This is to ensure a clean transition to Webpack without old Gulp files causing confusion.
