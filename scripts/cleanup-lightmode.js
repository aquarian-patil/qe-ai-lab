const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Lingering dark mode classes that make light mode inputs/hovers invisible
const cleanupReplacements = {
  // Input fields that still had text-white
  'text-white focus:outline-none': 'text-slate-900 focus:outline-none',
  'text-white font-mono': 'text-slate-900 font-mono',
  'text-white placeholder-slate-500': 'text-slate-900 placeholder-slate-500',
  
  // Sidebar hover issues (hovering turned text white against a white background!)
  'hover:text-white': 'hover:text-blue-600',
  'hover:bg-white/5': 'hover:bg-slate-200/50',
  'hover:bg-white/10': 'hover:bg-slate-200/50',
  'hover:bg-white/20': 'hover:bg-slate-300/50',
  
  // Lingering black backgrounds
  'bg-black/30': 'bg-slate-200',
  'bg-black/60': 'bg-slate-100',
  
  // Lingering white borders
  'border-white/10': 'border-slate-300',
  'border-white/20': 'border-slate-300'
};

let filesChanged = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [oldClass, newClass] of Object.entries(cleanupReplacements)) {
      const regex = new RegExp(oldClass, 'g');
      content = content.replace(regex, newClass);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Cleaned up dark mode artifacts in: ${filePath}`);
    }
  }
});

console.log(`\nCleanup complete. ${filesChanged} files modified.`);
