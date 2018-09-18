const Storage = require('@google-cloud/storage');
const fs = require('fs');
const projectId = 'test-project-id';
const bucketName = 'test-project-bucket-name.animallabs.co';
const keyFilename = 'auth/google_dev_upload.json';
const buildFileLocation = './dist/';

console.log(`deploying to ${projectId}/${bucketName}`);
bucket = Storage({
  projectId,
  keyFilename,
}).bucket(bucketName);

const emptyBucket = (cb) => {
bucket.getFiles()
  .then((results) => {
    let index = 1;
    const files = results[0];
    if (files.length) {
      files.forEach((file) => {
        bucket.file(file.name).delete()
          .then(() => {
            console.log(`deleted ${file.name}`);
            index++;
            if (index === files.length) {
              cb();
            }
          });
      });
    } else {
      console.log(`empty bucket`);
      cb();
    }
  })
  .catch(console.error);
};

const uploadOptions = {
  'index.html': { public: true, metadata: { cacheControl: 'no-cache' }},
  'bundle.js.gz': {
    public: true,
    metadata: {
      cacheControl: 'no-cache',
      contentEncoding: 'gzip',
    },
  },
  'vendor.bundle.js.gz': {
    public: true,
    metadata: {
      contentEncoding: 'gzip',
    },
  }
};

const uploadDist = () => {
    console.log('upload dist')

  const distFiles = fs.readdirSync(buildFileLocation);
  distFiles.forEach((file) => {
    const options = uploadOptions[file] || { public: true };
    bucket.upload(`${buildFileLocation}${file}`,options)
    .then(() => {
      console.log(`uploaded ${file}`);
    })
    .catch(console.error);
  });
  if (fs.existsSync('./webUtils/')) {
    const utilFiles = fs.readdirSync('./webUtils/');
    utilFiles.forEach((file) => {
      bucket.upload(`./webUtils/${file}`, { public: true })
        .then(() => {
          console.log(`uploaded ${file}`);
        })
        .catch(console.error);
    });
  }
};

emptyBucket(uploadDist);
