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
      
      // Revert clamp for specific files
      if (file === 'WelcomeSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.5rem,4.6vw,4.2rem)');
      else if (file === 'TestimonialsSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.75rem,5.5vw,4.8rem)');
      else if (file === 'SignatureTripsSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(3rem,6.2vw,5.6rem)');
      else if (file === 'MeetCaptainSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.75rem,5.4vw,4.8rem)');
      else if (file === 'Hero.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.75rem,8.6vw,9rem)');
      else if (file === 'FleetSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.75rem,6vw,5.2rem)');
      else if (file === 'FaqSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.5rem,5vw,4.4rem)');
      else if (file === 'CustomMerchSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(2.75rem,6.4vw,6rem)');
      else if (file === 'BoatRampsSection.tsx') content = content.replace(/clamp\([^)]+\)/g, 'clamp(3rem,6vw,5.2rem)');
      
      // Revert text-2xl -> text-4xl (since I replaced 4xl with 2xl)
      content = content.replace(/text-2xl/g, 'text-4xl');
      // Except in SiteHeader where it might have been 2xl originally?
      if (file === 'SiteHeader.tsx') content = content.replace(/text-4xl/g, 'text-2xl');
      
      // Revert text-4xl -> text-6xl (since I replaced 6xl with 4xl)
      if (file === 'MeetCaptainSection.tsx') content = content.replace(/text-4xl/g, 'text-6xl');

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src/components'));
console.log('Done');
