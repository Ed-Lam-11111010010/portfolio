const fs = require('fs');
const fp = 'src/pages/projects/[id].astro';
let s = fs.readFileSync(fp, 'utf8');
// Only add the base const, nothing else
s = s.replace(
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';",
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';\nconst base = import.meta.env.BASE_URL;"
);
s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
fs.writeFileSync(fp, s, 'utf8');
console.log('Only base const added');

