const fs = require('fs');
function fix(file, fn) {
  let s = fs.readFileSync(file, 'utf8');
  s = fn(s);
  fs.writeFileSync(file, s);
  console.log('Fixed:', file);
}
fix('src/layouts/BaseLayout.astro', s => {
  s = s.replace('const { title = "Edwin Lam \u2014 Portfolio", description = "Portfolio of Lam Chi (Edwin) \u2014 Information Engineering student, game designer, and creative technologist." } = Astro.props;', 'const { title = "Edwin Lam \u2014 Portfolio", description = "Portfolio of Lam Chi (Edwin) \u2014 Information Engineering student, game designer, and creative technologist." } = Astro.props;\nconst base = import.meta.env.BASE_URL;');
  s = s.replace('href="/favicon.svg"', 'href={`${base}favicon.svg`}');
  s = s.replace('href="/manifest.json"', 'href={`${base}manifest.json`}');
  s = s.replace('href="/" class="logo"', 'href={`${base}`} class="logo"');
  s = s.replace("navigator.serviceWorker.register('/sw.js')", "navigator.serviceWorker.register(`${base}sw.js`)");
  return s;
});
fix('src/components/ProjectCard.astro', s => {
  s = s.replace("import { findGenreForSkill, getSkillSlug } from '../data/skills.js';", "import { findGenreForSkill, getSkillSlug } from '../data/skills.js';\nconst base = import.meta.env.BASE_URL;");
  s = s.replace('href={`/projects/${project.id}`}', 'href={`${base}projects/${project.id}`}');
  s = s.replace('href={`/skills/${info.genreSlug}/${getSkillSlug(skill)}`}', 'href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`}');
  return s;
});
fix('src/components/SkillFilter.astro', s => {
  s = s.replace("import { getGenres, findGenreForSkill, getSkillSlug } from '../data/skills.js';", "import { getGenres, findGenreForSkill, getSkillSlug } from '../data/skills.js';\nconst base = import.meta.env.BASE_URL;");
  s = s.replace('href={`/skills/${genre.slug}/${skill.slug}`}', 'href={`${base}skills/${genre.slug}/${skill.slug}`}');
  return s;
});
fix('src/pages/projects/[id].astro', s => {
  s = s.replace("import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';", "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';\nconst base = import.meta.env.BASE_URL;");
  s = s.replace('href="/#projects"', 'href={`${base}#projects`}');
  s = s.replace('href={`/skills/${info.genreSlug}/${getSkillSlug(skill)}`}', 'href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`}');
  return s;
});
fix('src/pages/skills/[genre]/[skill].astro', s => {
  s = s.replace('const { genre, skill } = Astro.props;', 'const { genre, skill } = Astro.props;\nconst base = import.meta.env.BASE_URL;');
  s = s.replace('href="/#projects"', 'href={`${base}#projects`}');
  s = s.replace('href={`/#${genre.slug}`}', 'href={`${base}#${genre.slug}`}');
  return s;
});
console.log('ALL DONE');

