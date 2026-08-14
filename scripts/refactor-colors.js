const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const colorMap = {
  'cyan-': 'teal-',
  'purple-': 'emerald-',
  'pink-': 'indigo-',
  'zinc-': 'slate-',
  // Also replace explicit hex colors from the old theme that might exist in inline styles
  'from-purple-400': 'from-emerald-400',
  'to-cyan-400': 'to-teal-400',
  'from-purple-600': 'from-emerald-600',
  'to-cyan-600': 'to-teal-600'
};

let filesChanged = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [oldColor, newColor] of Object.entries(colorMap)) {
      // Use regex to match the exact tailwind classes globally
      const regex = new RegExp(oldColor, 'g');
      content = content.replace(regex, newColor);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Updated colors in ${filePath}`);
    }
  }
});

console.log(`\nColor refactoring complete. ${filesChanged} files modified.`);
