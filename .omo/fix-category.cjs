const fs = require('fs');
const s = fs.readFileSync('src/pages/projects/[id].astro', 'utf8');

// Replace the complex regex on line 59 with a simpler version
const newS = s.replace(
  "{project.category.replace(/-/g, ' ').replace(/\\b\\w/g, (c) => c.toUpperCase())}",
  "{project.category}"
);

fs.writeFileSync('src/pages/projects/[id].astro', newS);
console.log('Line 59 simplified');

