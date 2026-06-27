```cjs
const fs = require('fs');
const fp = 'src/pages/projects/[id].astro';
let s = fs.readFileSync(fp, 'utf8');

// 1. Add base const
s = s.replace(
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';",
  "import { findGenreForSkill, getSkillSlug } from '../../data/skills.js';\nconst base = import.meta.env.BASE_URL;"
);

// 2. Fix back link href
s = s.replace(
  '<a href="/#projects" class="detail-back">',
  '<a href={`${base}#projects`} class="detail-back">'
);

// 3. Fix skill link href
s = s.replace(
  '<a href={`/skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">',
  '<a href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">'
);

// 4. Replace the entire template section with two-column layout (ASCII-safe)
var newTemplate = '';
newTemplate += '<BaseLayout title={pageTitle} description={project.description}>\n';
newTemplate += '  <div class="project-detail-page">\n';
newTemplate += '    <div class="detail-sidebar">\n';
newTemplate += '      <a href={`${base}#projects`} class="detail-back">&larr; Back to all projects</a>\n';
newTemplate += '\n';
newTemplate += '      <div class="detail-image-box">\n';
newTemplate += '        {project.image ? (\n';
newTemplate += '          <img src={project.image} alt={project.title} />\n';
newTemplate += '        ) : (\n';
newTemplate += '          <div class="detail-image-placeholder">\n';
newTemplate += '            <span>&#128193;</span>\n';
newTemplate += '          </div>\n';
newTemplate += '        )}\n';
newTemplate += '      </div>\n';
newTemplate += '\n';
newTemplate += '      <div class="detail-sidebar-links">\n';
newTemplate += '        <h3>Links</h3>\n';
newTemplate += '        {project.links.github && (\n';
newTemplate += '          <a href={project.links.github} target="_blank" rel="noopener noreferrer" class="btn btn-block">View on GitHub &rarr;</a>\n';
newTemplate += '        )}\n';
newTemplate += '        {project.source_url && project.external && !project.links.github && (\n';
newTemplate += '          <a href={project.source_url} target="_blank" rel="noopener noreferrer" class="btn btn-block btn-cloud">View on Cloud &rarr;</a>\n';
newTemplate += '        )}\n';
newTemplate += '        {project.links.demo && (\n';
newTemplate += '          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="btn btn-block">Live Demo &rarr;</a>\n';
newTemplate += '        )}\n';
newTemplate += '        {project.links.video && (\n';
newTemplate += '          <a href={project.links.video} target="_blank" rel="noopener noreferrer" class="btn btn-block">Watch Video &rarr;</a>\n';
newTemplate += '        )}\n';
newTemplate += '      </div>\n';
newTemplate += '    </div>\n';
newTemplate += '\n';
newTemplate += '    <div class="detail-main">\n';
newTemplate += '      <h1 class="detail-title">\n';
newTemplate += '        {project.title}\n';
newTemplate += '        {project.external && <span class="badge-external-detail">Cloud</span>}\n';
newTemplate += '      </h1>\n';
newTemplate += '\n';
newTemplate += '      <div class="detail-meta">\n';
newTemplate += '        <span class="detail-year">{project.year}</span>\n';
newTemplate += '        <span class="detail-type">{project.type || \'personal\'}</span>\n';
newTemplate += '        <span class="detail-category">{project.category.replace(/-/g, \' \').replace(/\\b\\w/g, (c) => c.toUpperCase())}</span>\n';
newTemplate += '      </div>\n';
newTemplate += '\n';
newTemplate += '      <section class="detail-section">\n';
newTemplate += '        <h3>Description</h3>\n';
newTemplate += '        <p>{project.description}</p>\n';
newTemplate += '      </section>\n';
newTemplate += '\n';
newTemplate += '      <section class="detail-section">\n';
newTemplate += '        <h3>Skills</h3>\n';
newTemplate += '        <div class="detail-skills">\n';
newTemplate += '          {project.skills.map((skill) => {\n';
newTemplate += '            const info = findGenreForSkill(skill);\n';
newTemplate += '            return (\n';
newTemplate += '              <a href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">{skill}</a>\n';
newTemplate += '            );\n';
newTemplate += '          })}\n';
newTemplate += '        </div>\n';
newTemplate += '      </section>\n';
newTemplate += '\n';
newTemplate += '      {project.highlights && project.highlights.length > 0 && (\n';
newTemplate += '        <section class="detail-section">\n';
newTemplate += '          <h3>Highlights</h3>\n';
newTemplate += '          <ul class="detail-highlights-list">\n';
newTemplate += '            {project.highlights.map((highlight) => (\n';
newTemplate += '              <li>{highlight}</li>\n';
newTemplate += '            ))}\n';
newTemplate += '          </ul>\n';
newTemplate += '        </section>\n';
newTemplate += '      )}\n';
newTemplate += '    </div>\n';
newTemplate += '  </div>\n';
newTemplate += '</BaseLayout>\n';

s = s.replace(/<BaseLayout[\s\S]*?<\/BaseLayout>/, newTemplate);

// Ensure LF line endings
s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

fs.writeFileSync(fp, s, 'utf8');
console.log('[id].astro - fully updated with ASCII-safe two-column layout');
```
