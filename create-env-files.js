const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: './.env' });

const createNewConfigFile = (fileName, filePath, fileContent) => {
  return {
    fileName,
    filePath: path.join(__dirname, `${filePath}${fileName}`),
    fileContent,
  };
};

const filesToCreate = [
  createNewConfigFile(
    'environment.ts',
    './src/app/core/config/',
    `export const environment = {
  firebase: {
    apiKey: '${process.env.WCS_FIREBASE_API_KEY}',
    authDomain: '${process.env.WCS_FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.WCS_FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.WCS_FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.WCS_FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.WCS_FIREBASE_APP_ID}',
    measurementId: '${process.env.WCS_FIREBASE_MEASUREMENT_ID}',
  }
}`,
  ),
];

filesToCreate.forEach((file) => {
  const { fileName, filePath, fileContent } = file;
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(successColor, `${checkSign} Successfully generated ${fileName}`);
    }
  });
});
