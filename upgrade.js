#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to update or create package.json with required fields
function ensurePackageJson() {
  if (!fs.existsSync("package.json")) {
    console.log("No package.json found. Initializing a new one...");
    execSync("npm init -y", { stdio: "inherit" });
  }

  // Read package.json data
  const packagePath = path.resolve("package.json");
  const packageData = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

  // Define additional fields
  const additionalFields = {
    name: path.basename(process.cwd()), // Use current directory name
    version: "1.0.0",
    description: "WordPress project with Webpack for asset management",
    main: "webpack.config.js",
    scripts: {
      build: "webpack --config webpack.config.js",
      watch: "webpack --watch --config webpack.config.js",
    },
    author: "E11 Group",
    license: "ISC",
  };

  // Merge additional fields into package.json data, preserving existing values except for scripts
  Object.entries(additionalFields).forEach(([key, value]) => {
    if (key === "scripts") {
      // Overwrite specific scripts
      packageData.scripts = { ...packageData.scripts, ...value };
    } else if (!packageData[key]) {
      packageData[key] = value;
    }
  });

  // Write updated package.json data back to file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  console.log("✔ package.json updated with custom fields.");
}

// Ensure package.json exists and has the required fields
ensurePackageJson();

// Check if node_modules exists; install dependencies if missing
if (!fs.existsSync("node_modules")) {
  console.log("Installing necessary packages...");
  execSync(
    "npm install @inquirer/inquirer autoprefixer css-loader glob mini-css-extract-plugin postcss-loader sass sass-loader terser webpack webpack-cli webpack-concat-files-plugin prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-promise",
    { stdio: "inherit" }
  );
  console.log("✔ Dependencies installed successfully.");
}

// Download setup-webpack.js
console.log("Downloading setup-webpack.js...");
execSync(
  "curl -s -o setup-webpack.js https://raw.githubusercontent.com/E11-Group/gulp-to-webpack/main/setup-webpack.js",
  { stdio: "inherit" }
);

// Download webpack.config.js
console.log("Downloading webpack.config.js...");
execSync(
  "curl -s -o webpack.config.js https://raw.githubusercontent.com/E11-Group/gulp-to-webpack/main/webpack.config.js",
  { stdio: "inherit" }
);

// Execute setup-webpack.js
console.log("Running setup-webpack.js...");
execSync("node setup-webpack.js", { stdio: "inherit" });

// Delete setup-webpack.js after execution
fs.unlinkSync("setup-webpack.js");
console.log("✔ setup-webpack.js deleted after execution.");

// Delete upgrade.js after execution
fs.unlinkSync(__filename);
console.log("✔ upgrade.js deleted after execution.");

// Write .prettierrc
const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
};

fs.writeFileSync(".prettierrc", JSON.stringify(prettierConfig, null, 2));
console.log("✔ .prettierrc created");

// Write .eslintrc.json
const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Integrates Prettier with ESLint
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "warn", // Highlights Prettier issues in ESLint
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};

fs.writeFileSync(".eslintrc.json", JSON.stringify(eslintConfig, null, 2));
console.log("✔ .eslintrc.json created");

// Write .eslintignore
const eslintIgnoreContent = `
node_modules
`;

fs.writeFileSync(".eslintignore", eslintIgnoreContent.trim());
console.log("✔ .eslintignore created");

// Download .vscode/settings.json
console.log("Setting up VSCode configuration...");
execSync(
  "mkdir -p .vscode && curl -s -o .vscode/settings.json https://raw.githubusercontent.com/E11-Group/gulp-to-webpack/main/.vscode/settings.json",
  { stdio: "inherit" }
);
console.log("✔ VSCode settings configured for Prettier and ESLint");
