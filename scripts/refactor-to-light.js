const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const strictReplacements = {
  // Brand colors (Teal/Emerald/Indigo from deep sea -> Blue/Violet/Rose for light mode)
  'teal-': 'blue-',
  'emerald-': 'violet-',
  'indigo-': 'rose-',
  
  // Backgrounds
  'bg-black/20': 'bg-white/60',
  'bg-black/40': 'bg-white/80',
  'bg-black/50': 'bg-white/90',
  '\\[#1e1e1e\\]': '\\[#ffffff\\]', // Genesis code block bg
  '\\[#0c0c0c\\]': '\\[#f1f5f9\\]', // Terminal bg
  '\\[#2d2d2d\\]': '\\[#e2e8f0\\]', // Code block header
  
  // Dark borders to light borders
  'border-slate-800': 'border-slate-200',
  'border-slate-700': 'border-slate-300',
  'border-black/50': 'border-slate-200',
  
  // Text colors (Zinc was mapped to Slate earlier)
  'text-slate-400': 'text-slate-500',
  'text-slate-300': 'text-slate-600',
  'text-slate-500': 'text-slate-400' // swap hierarchy
};

let filesChanged = 0;

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Safely replace text-white with text-slate-900 on specific tags (h1-h6, p, span, div, svg)
    // We intentionally DO NOT replace it on <button> or <a> tags that might be styled buttons.
    content = content.replace(/<(h[1-6]|p|span|div|svg|label)([^>]*)text-white/g, '<$1$2text-slate-900');
    // Also catch cases where text-white is in the middle of a className string
    content = content.replace(/<(h[1-6]|p|span|div|svg|label)([^>]*?)text-white([^>]*?)>/g, '<$1$2text-slate-900$3>');

    // 2. Run standard string replacements
    for (const [oldClass, newClass] of Object.entries(strictReplacements)) {
      const regex = new RegExp(oldClass, 'g');
      content = content.replace(regex, newClass);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Converted to Light Mode: ${filePath}`);
    }
  }
});

console.log(`\nLight mode refactoring complete. ${filesChanged} files modified.`);
