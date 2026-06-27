const fs = require('fs');
const fp = 'src/pages/projects/[id].astro';
let s = fs.readFileSync(fp, 'utf8');

// Add const base AFTER the last import statement
s = s.replace(
  "import projects from '../../data/projects.json';",
  "import projects from '../../data/projects.json';\nconst base = import.meta.env.BASE_URL;"
);

// Normalize line endings
s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

fs.writeFileSync(fp, s, 'utf8');
console.log('Done: const base added after all imports');

