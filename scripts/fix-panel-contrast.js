const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Re-introducing visual hierarchy and contrast to inner panels and modules
const contrastReplacements = {
  // Replace white-on-white panels with subtle slate grays
  'bg-white/80': 'bg-slate-100',
  'bg-white/60': 'bg-slate-50',
  
  // Strengthen borders slightly so panels don't wash out
  'border-\\[var\\(--panel-border\\)\\]': 'border-slate-300',
  'border-slate-200': 'border-slate-300',
  
  // Deepen text slightly more if it was slate-700
  'text-slate-700': 'text-slate-800'
};

let filesChanged = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [oldClass, newClass] of Object.entries(contrastReplacements)) {
      const regex = new RegExp(oldClass, 'g');
      content = content.replace(regex, newClass);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Improved panel contrast in: ${filePath}`);
    }
  }
});

console.log(`\nContrast refactoring complete. ${filesChanged} files modified.`);
