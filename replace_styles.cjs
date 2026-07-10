const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove specific complex classes
      content = content.replace(/font-serif font-medium italic normal-case/g, '');
      content = content.replace(/font-serif text-\[.*?\] font-medium italic normal-case/g, '');
      content = content.replace(/font-serif normal-case italic font-medium/g, '');
      content = content.replace(/font-serif text-\w+ italic/g, '');
      content = content.replace(/font-serif text-\[\d+(\.\d+)?em\] font-medium italic normal-case/g, '');
      content = content.replace(/font-serif text-xl italic/g, '');
      content = content.replace(/font-serif text-lg italic/g, '');
      content = content.replace(/font-serif text-\[19px\] italic/g, '');
      content = content.replace(/font-serif text-\[0\.92em\] font-medium normal-case italic/g, '');
      
      // Remove any remaining font-serif or italic
      content = content.replace(/\bfont-serif\b/g, '');
      content = content.replace(/\bitalic\b/g, '');
      content = content.replace(/\bnormal-case\b/g, '');
      
      // Clean up empty classNames or double spaces
      content = content.replace(/className="\s+/g, 'className="');
      content = content.replace(/\s+"/g, '"');
      content = content.replace(/className=""/g, '');
      content = content.replace(/  +/g, ' ');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(path.join(__dirname, 'src/components'));
console.log('Done');
