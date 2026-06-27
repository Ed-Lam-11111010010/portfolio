var fs = require('fs');
var fp = 'src/pages/projects/[id].astro';
var s = fs.readFileSync(fp, 'utf8');

// 1. Fix back link href
s = s.replace(
  '<a href="/#projects" class="detail-back">',
  '<a href={`${base}#projects`} class="detail-back">'
);

// 2. Fix skill link href
s = s.replace(
  '<a href={`/skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">',
  '<a href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">'
);

// 3. Build two-column layout (ASCII-safe, no template literals)
var t = '';
t += '<BaseLayout title={pageTitle} description={project.description}>\n';
t += '  <div class="project-detail-page">\n';
t += '    <div class="detail-sidebar">\n';
t += '      <a href={`${base}#projects`} class="detail-back">&larr; Back</a>\n';
t += '\n';
t += '      <div class="detail-image-box">\n';
t += '        {project.image ? (\n';
t += '          <img src={project.image} alt={project.title} />\n';
t += '        ) : (\n';
t += '          <div class="detail-image-placeholder">\n';
t += '            <span>&#128193;</span>\n';
t += '          </div>\n';
t += '        )}\n';
t += '      </div>\n';
t += '\n';
t += '      <div class="detail-sidebar-links">\n';
t += '        <h3>Links</h3>\n';
t += '        {project.links.github && (\n';
t += '          <a href={project.links.github} target="_blank" rel="noopener noreferrer" class="btn btn-block">GitHub &rarr;</a>\n';
t += '        )}\n';
t += '        {project.source_url && project.external && !project.links.github && (\n';
t += '          <a href={project.source_url} target="_blank" rel="noopener noreferrer" class="btn btn-block btn-cloud">Cloud &rarr;</a>\n';
t += '        )}\n';
t += '        {project.links.demo && (\n';
t += '          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="btn btn-block">Demo &rarr;</a>\n';
t += '        )}\n';
t += '        {project.links.video && (\n';
t += '          <a href={project.links.video} target="_blank" rel="noopener noreferrer" class="btn btn-block">Video &rarr;</a>\n';
t += '        )}\n';
t += '      </div>\n';
t += '    </div>\n';
t += '\n';
t += '    <div class="detail-main">\n';
t += '      <h1 class="detail-title">\n';
t += '        {project.title}\n';
t += '        {project.external && <span class="badge-external-detail">Cloud</span>}\n';
t += '      </h1>\n';
t += '\n';
t += '      <div class="detail-meta">\n';
t += '        <span class="detail-year">{project.year}</span>\n';
t += '        <span class="detail-type">{project.type || "personal"}</span>\n';
t += '        <span class="detail-category">{project.category.replace(/-/g, " ").replace(/\\b\\w/g, (c) => c.toUpperCase())}</span>\n';
t += '      </div>\n';
t += '\n';
t += '      <section class="detail-section">\n';
t += '        <h3>Description</h3>\n';
t += '        <p>{project.description}</p>\n';
t += '      </section>\n';
t += '\n';
t += '      <section class="detail-section">\n';
t += '        <h3>Skills</h3>\n';
t += '        <div class="detail-skills">\n';
t += '          {project.skills.map((skill) => {\n';
t += '            const info = findGenreForSkill(skill);\n';
t += '            return (\n';
t += '              <a href={`${base}skills/${info.genreSlug}/${getSkillSlug(skill)}`} class="filter-tag">{skill}</a>\n';
t += '            );\n';
t += '          })}\n';
t += '        </div>\n';
t += '      </section>\n';
t += '\n';
t += '      {project.highlights && project.highlights.length > 0 && (\n';
t += '        <section class="detail-section">\n';
t += '          <h3>Highlights</h3>\n';
t += '          <ul class="detail-highlights-list">\n';
t += '            {project.highlights.map((highlight) => (\n';
t += '              <li>{highlight}</li>\n';
t += '            ))}\n';
t += '          </ul>\n';
t += '        </section>\n';
t += '      )}\n';
t += '    </div>\n';
t += '  </div>\n';
t += '</BaseLayout>\n';

s = s.replace(/<BaseLayout[\s\S]*?<\/BaseLayout>/, t);
s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
fs.writeFileSync(fp, s, 'utf8');
console.log('DONE: [id].astro redesigned + hrefs fixed');

