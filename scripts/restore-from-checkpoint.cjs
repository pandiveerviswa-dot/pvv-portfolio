const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const checkpointDir = path.join(rootDir, '_checkpoints', 'PORTFOLIO-FINAL-BEFORE-QA');

if (!fs.existsSync(checkpointDir)) {
  console.error('Error: Checkpoint directory not found at:', checkpointDir);
  process.exit(1);
}

const manifestPath = path.join(checkpointDir, 'checkpoint-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('Error: Checkpoint manifest not found at:', manifestPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log('Restoring checkpoint:', meta.name);
console.log('Timestamp:', meta.timestamp);
console.log('Master Hash:', meta.masterHash);

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry === 'checkpoint-manifest.json') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

let restoredCount = 0;
for (const item of meta.manifest) {
  if (item.path === 'checkpoint-manifest.json') continue;
  const srcFile = path.join(checkpointDir, item.path);
  const destFile = path.join(rootDir, item.path);
  const destDir = path.dirname(destFile);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcFile, destFile);
  restoredCount++;
}

console.log(`✓ Successfully restored ${restoredCount} files to baseline state.`);
