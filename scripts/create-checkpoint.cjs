const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const checkpointBaseDir = path.join(rootDir, '_checkpoints');
const checkpointName = 'PORTFOLIO-FINAL-BEFORE-QA';
const targetDir = path.join(checkpointBaseDir, checkpointName);

console.log('Creating restore checkpoint at:', targetDir);

if (!fs.existsSync(checkpointBaseDir)) {
  fs.mkdirSync(checkpointBaseDir, { recursive: true });
}

if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '_checkpoints' || entry === '.git') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy all essential directories and files
const itemsToBackup = [
  'src',
  'public',
  'scripts',
  'dist',
  'index.html',
  'package.json',
  'package-lock.json',
  'tailwind.config.js',
  'postcss.config.js',
  'vite.config.js'
];

for (const item of itemsToBackup) {
  const itemPath = path.join(rootDir, item);
  if (fs.existsSync(itemPath)) {
    copyRecursive(itemPath, path.join(targetDir, item));
    console.log(`✓ Copied ${item}`);
  }
}

// 2. Compute Manifest SHA-256 for all files in checkpoint
function hashDirectory(dir, relativeTo = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hashes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      hashes.push(...hashDirectory(fullPath, relativeTo));
    } else {
      const fileData = fs.readFileSync(fullPath);
      const hash = crypto.createHash('sha256').update(fileData).digest('hex');
      const relPath = path.relative(relativeTo, fullPath).replace(/\\/g, '/');
      hashes.push({ path: relPath, hash, size: fileData.length });
    }
  }
  return hashes;
}

const manifest = hashDirectory(targetDir);
manifest.sort((a, b) => a.path.localeCompare(b.path));

// Master checkpoint hash
const masterHasher = crypto.createHash('sha256');
manifest.forEach(item => masterHasher.update(`${item.path}:${item.hash}:${item.size}\n`));
const masterHash = masterHasher.digest('hex');

const checkpointMeta = {
  name: checkpointName,
  timestamp: new Date().toISOString(),
  masterHash,
  fileCount: manifest.length,
  manifest
};

fs.writeFileSync(
  path.join(targetDir, 'checkpoint-manifest.json'),
  JSON.stringify(checkpointMeta, null, 2)
);

// 3. Verification test: Verify that every file in root matches the checkpoint
let verifySuccess = true;
let checkedCount = 0;

for (const item of manifest) {
  if (item.path === 'checkpoint-manifest.json') continue;
  const originalPath = path.join(rootDir, item.path);
  if (!fs.existsSync(originalPath)) {
    console.error(`✗ Missing original file: ${item.path}`);
    verifySuccess = false;
    continue;
  }
  const originalData = fs.readFileSync(originalPath);
  const originalHash = crypto.createHash('sha256').update(originalData).digest('hex');
  if (originalHash !== item.hash) {
    console.error(`✗ Hash mismatch for: ${item.path}`);
    verifySuccess = false;
  } else {
    checkedCount++;
  }
}

console.log('====================================================');
console.log('CHECKPOINT CREATION REPORT');
console.log('Name:', checkpointName);
console.log('Method: Standalone Recursive Filesystem Mirror + Cryptographic Manifest');
console.log('Master SHA-256 Hash:', masterHash);
console.log('Files Verified:', checkedCount, '/', manifest.length);
console.log('Restore Verified:', verifySuccess ? 'YES' : 'NO');
console.log('Location:', targetDir);
console.log('====================================================');

if (!verifySuccess) {
  process.exit(1);
}
