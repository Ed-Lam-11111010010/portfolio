const fs = require('fs');
const fp = 'src/pages/projects/[id].astro';
let s = fs.readFileSync(fp, 'utf8');

// Step 1: add base const after the import line
s = s.replace(
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';",
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';\nconst base = import.meta.env.BASE_URL;"
);

// Step 2: fix back link href
s = s.replace(
  '<a href="/#projects" class="detail-back">',
  '<a href={`${base}#projects`} class="detail-back">'
);

// Step 3: fix skill links href
s = s.replace(
  '<a href={`/skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">',
  '<a href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">'
);

fs.writeFileSync(fp, s);
console.log('Base URL changes applied to [id].astro');

