const fs = require('fs');
const fp = 'src/pages/projects/[id].astro';
let s = fs.readFileSync(fp, 'utf8');

const newTemplate = `<BaseLayout title={pageTitle} description={project.description}>
  <div class="project-detail-page">
    <div class="detail-sidebar">
      <a href={\`\${base}#projects\`} class="detail-back">??Back to all projects</a>

      <div class="detail-image-box">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div class="detail-image-placeholder">
            <span>??</span>
          </div>
        )}
      </div>

      <div class="detail-sidebar-links">
        <h3>Links</h3>
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" class="btn btn-block">View on GitHub ??/a>
        )}
        {project.source_url && project.external && !project.links.github && (
          <a href={project.source_url} target="_blank" rel="noopener noreferrer" class="btn btn-block btn-cloud">View on Cloud ??/a>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="btn btn-block">Live Demo ??/a>
        )}
        {project.links.video && (
          <a href={project.links.video} target="_blank" rel="noopener noreferrer" class="btn btn-block">Watch Video ??/a>
        )}
      </div>
    </div>

    <div class="detail-main">
      <h1 class="detail-title">
        {project.title}
        {project.external && <span class="badge-external-detail">Cloud</span>}
      </h1>

      <div class="detail-meta">
        <span class="detail-year">{project.year}</span>
        <span class="detail-type">{project.type || 'personal'}</span>
        <span class="detail-category">{project.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
      </div>

      <section class="detail-section">
        <h3>Description</h3>
        <p>{project.description}</p>
      </section>

      <section class="detail-section">
        <h3>Skills</h3>
        <div class="detail-skills">
          {project.skills.map((skill) => {
            const info = findGenreForSkill(skill);
            return (
              <a href={\`\${base}skills/\${info.genreSlug}/\${getSkillSlug(skill)}\`} class="filter-tag">{skill}</a>
            );
          })}
        </div>
      </section>

      {project.highlights && project.highlights.length > 0 && (
        <section class="detail-section">
          <h3>Highlights</h3>
          <ul class="detail-highlights-list">
            {project.highlights.map((highlight) => (
              <li>{highlight}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </div>
</BaseLayout>`;

// Replace everything from <BaseLayout...> to </BaseLayout>
s = s.replace(/<BaseLayout[\s\S]*?<\/BaseLayout>/, newTemplate);

fs.writeFileSync(fp, s);
console.log('[id].astro - two-column redesign applied');

