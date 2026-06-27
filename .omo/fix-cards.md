```cjs
const fs = require('fs');

// 1. Update ProjectCard.astro - add type to interface + badge
let card = fs.readFileSync('src/components/ProjectCard.astro', 'utf8');
// Add type to interface
card = card.replace(
  'source_url?: string | null;\n  }',
  'source_url?: string | null;\n    type?: string;\n  }'
);
// Change year line to include type badge
card = card.replace(
  '<p class="project-card-year">{project.year}</p>',
  '<p class="project-card-year">\n        {project.type && <span class="project-type-badge">{project.type}</span>}\n        <span>{project.year}</span>\n      </p>'
);
fs.writeFileSync('src/components/ProjectCard.astro', card);
console.log('ProjectCard.astro - type badge added');

// 2. Add CSS for type badge to global.css
let css = fs.readFileSync('src/styles/global.css', 'utf8');
css += '\n\n/* ===== Project Type Badge ===== */\n.project-type-badge {\n  display: inline-block;\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 0.15rem 0.5rem;\n  border-radius: 4px;\n  background: var(--color-accent);\n  color: #fff;\n  margin-right: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  vertical-align: middle;\n}\n';
fs.writeFileSync('src/styles/global.css', css);
console.log('global.css - type badge CSS added');

// 3. Redesign [id].astro with two-column layout
let detail = fs.readFileSync('src/pages/projects/[id].astro', 'utf8');

// Replace the entire content between <BaseLayout> and </BaseLayout>
const oldContent = detail.match(/<BaseLayout[\s\S]*?>[\s\S]*?<\/BaseLayout>/);
if (oldContent) {
  const newContent = `<BaseLayout title={pageTitle} description={project.description}>
  <div class="project-detail-page">
    <div class="detail-sidebar">
      <a href={\`\${base}#projects\`} class="detail-back">\u2190 Back to all projects</a>
      
      <div class="detail-image-box">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div class="detail-image-placeholder">
            <span>\uD83D\uDCC1</span>
          </div>
        )}
      </div>

      <div class="detail-sidebar-links">
        <h3>Links</h3>
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" class="btn btn-block">View on GitHub \u2192</a>
        )}
        {project.source_url && project.external && !project.links.github && (
          <a href={project.source_url} target="_blank" rel="noopener noreferrer" class="btn btn-block btn-cloud">View on Cloud \u2192</a>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="btn btn-block">Live Demo \u2192</a>
        )}
        {project.links.video && (
          <a href={project.links.video} target="_blank" rel="noopener noreferrer" class="btn btn-block">Watch Video \u2192</a>
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
        <span class="detail-category">{project.category.replace(/-/g, ' ').replace(/\\b\\w/g, (c) => c.toUpperCase())}</span>
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
  detail = detail.replace(oldContent[0], newContent);
  fs.writeFileSync('src/pages/projects/[id].astro', detail);
  console.log('[id].astro - redesigned with two-column layout');
}

// 4. Add CSS for new detail layout to global.css
css = fs.readFileSync('src/styles/global.css', 'utf8');

const detailCSS = `
/* ===== Project Detail Page (Two-Column Layout) ===== */
.project-detail-page {
  display: flex;
  gap: 2.5rem;
  padding: 2rem 0;
  align-items: flex-start;
}

.detail-sidebar {
  flex: 0 0 320px;
  position: sticky;
  top: 80px;
}

.detail-main {
  flex: 1;
  min-width: 0;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  text-decoration: none;
}

.detail-back:hover {
  color: var(--color-accent);
}

.detail-image-box {
  width: 100%;
  aspect-ratio: 16/10;
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 3rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.detail-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 3rem;
}

.detail-sidebar-links h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.btn-block {
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--color-accent);
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s ease;
  margin-bottom: 0.5rem;
}

.btn-block:hover {
  opacity: 0.9;
}

.btn-cloud {
  background: var(--color-text-secondary);
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.detail-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.detail-year,
.detail-type,
.detail-category {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: var(--color-tag-bg);
}

.detail-type {
  background: var(--color-accent);
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-border);
}

.detail-section p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.detail-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-highlights-list {
  list-style: none;
  padding: 0;
}

.detail-highlights-list li {
  padding: 0.4rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--color-text-secondary);
}

.detail-highlights-list li::before {
  content: '\u2192';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .project-detail-page {
    flex-direction: column;
  }
  .detail-sidebar {
    flex: none;
    width: 100%;
    position: static;
  }
  .detail-title {
    font-size: 1.5rem;
  }
}
`;

if (!css.includes('project-detail-page')) {
  css += detailCSS;
  fs.writeFileSync('src/styles/global.css', css);
  console.log('global.css - detail page CSS added');
} else {
  console.log('global.css - detail page CSS already exists, skipping');
}

console.log('\nALL DONE!');
```
