const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Bumping up the darkness of secondary text for better contrast in light mode
const textReplacements = {
  'text-slate-400': 'text-slate-600',
  'text-slate-500': 'text-slate-600',
  'text-slate-600': 'text-slate-700'
};

let filesChanged = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [oldClass, newClass] of Object.entries(textReplacements)) {
      const regex = new RegExp(oldClass, 'g');
      content = content.replace(regex, newClass);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Darkened fonts in: ${filePath}`);
    }
  }
});

console.log(`\nFont darkening complete. ${filesChanged} files modified.`);
