const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Downsize clamp headings significantly
      content = content.replace(/clamp\([^,]+,([^,]+),([^)]+)\)/g, (match, vw, max) => {
         return `clamp(1.5rem, 3.5vw, 3rem)`;
      });
      // specifically for hero
      content = content.replace(/clamp\(1.5rem, 3.5vw, 3rem\)/g, 'clamp(2rem, 5vw, 4rem)'); // restore hero slightly bigger but smaller than original

      // Replace text-4xl -> text-2xl
      content = content.replace(/text-4xl/g, 'text-2xl');
      // Replace text-[clamp... to something more manageable if missed
      content = content.replace(/text-6xl/g, 'text-4xl');
      
      // Remove N 45° coordinates from WelcomeSection and others
      content = content.replace(/N 45° 38&apos;/g, '');
      content = content.replace(/W 121° 12&apos;/g, '');
      content = content.replace(/<span className="flex items-center gap-2">\s*<span className="inline-block h-px w-6 bg-accent" \/>\s*<\/span>\s*<span><\/span>/g, '');
      
      // Remove em dashes and placeholders like '— image slot —'
      content = content.replace(/— image slot —/g, '');
      content = content.replace(/— VESSEL PHOTO SLOT —/g, '');
      content = content.replace(/— INTERACTIVE MAP —/g, '');
      content = content.replace(/— from apparel to promo/g, 'from apparel to promo');
      content = content.replace(/— each one guided personally/g, 'each one guided personally');
      content = content.replace(/— from the/g, 'from the');
      content = content.replace(/— first aid/g, 'first aid');
      content = content.replace(/— safety is always/g, 'safety is always');
      content = content.replace(/— seats up to 4/g, 'seats up to 4');
      content = content.replace(/— prized worldwide/g, 'prized worldwide');
      content = content.replace(/— the most powerful/g, 'the most powerful');
      content = content.replace(/— every angler/g, 'every angler');
      content = content.replace(/— just ask/g, 'just ask');
      content = content.replace(/— safety first —/g, 'safety first');
      content = content.replace(/— /g, '');
      
      // Clean up empty containers left by coordinates
      content = content.replace(/<div className="flex items-start justify-between text-\[11px\] tracking-\[0.2em\] text-cream\/70">\s*<\/div>/g, '');
      
      // Clean up empty placeholders left behind
      content = content.replace(/<span className="mt-3 block text-\[11px\] tracking-\[0.25em\] text-cream\/40">\s*<\/span>/g, '');

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src/components'));
console.log('Done');
