# Type Filter Implementation Script

Run via: node -e "$(powershell -Command \"Get-Content .omo\\fix-type-filter.md | Select-Object -Skip 6 | ForEach-Object { if ($_ -eq '```') { return } else { $_ } } \")"

```cjs
const fs = require('fs');

// 1. Fix ProjectCard.astro - add data-project-type attribute
let card = fs.readFileSync('src/components/ProjectCard.astro', 'utf8');

// Revert any button change first - restore <a> link
card = card.replace(
  `<button \n    class="project-card-link" \n    type="button"\n    onclick="window.openProjectModal('{project.id}')"\n    aria-label="View details for {project.title}"\n  >`,
  `<a href=\`\${base}projects/\${project.id}\` class="project-card-link">`
);

card = card.replace('</button>', '</a>');

// Remove button-specific CSS that was added
card = card.replace(`\n  .project-card-link:focus-visible {\n    outline: 2px solid var(--color-accent);\n    outline-offset: 2px;\n    border-radius: var(--border-radius);\n  }`, '');

// Now add data-project-type attribute
card = card.replace(
  '<article class={cardClass} data-project-skills={skillList}>',
  '<article class={cardClass} data-project-skills={skillList} data-project-type={project.type || ''}>'
);

fs.writeFileSync('src/components/ProjectCard.astro', card);
console.log('✓ ProjectCard.astro updated');

// 2. Modify SkillFilter.astro
let filter = fs.readFileSync('src/components/SkillFilter.astro', 'utf8');

// Add type tabs div between genre-tabs and skill-chips
filter = filter.replace(
  '  </div>\n  <div class="skill-chips" id="skillChips">',
  '  </div>\n  <div class="type-tabs">\n    <button class="type-tab active" data-type="" type="button">All Types</button>\n    <button class="type-tab" data-type="personal" type="button">Personal</button>\n    <button class="type-tab" data-type="coursework" type="button">Coursework</button>\n    <button class="type-tab" data-type="game-dev" type="button">Game Dev</button>\n    <button class="type-tab" data-type="game-design" type="button">Game Design</button>\n    <button class="type-tab" data-type="multimedia" type="button">Multimedia</button>\n    <button class="type-tab" data-type="leadership" type="button">Leadership</button>\n    <button class="type-tab" data-type="documentation" type="button">Documentation</button>\n  </div>\n  <div class="skill-chips" id="skillChips">'
);

// Add activeType variable after activeFilters
filter = filter.replace(
  'let activeFilters = new Set();',
  'let activeFilters = new Set();\n  let activeType = \'\';'
);

// Add updateTypeTabs function
filter = filter.replace(
  'function updateChips() {',
  'function updateTypeTabs() {\n    document.querySelectorAll(\'.type-tab\').forEach((tab) => {\n      tab.classList.toggle(\'active\', tab.dataset.type === activeType);\n    });\n  }\n\n  function updateChips() {'
);

// Replace the updateFilter function
const oldUpdateFilter = `function updateFilter() {
    const cards = projectCards();
    let visibleCount = 0;

    if (activeFilters.size === 0) {
      cards.forEach((card) => { card.style.display = ''; });
      visibleCount = cards.length;
    } else {
      cards.forEach((card) => {
        const skills = (card.dataset.projectSkills || '').split(',');
        const matches = [...activeFilters].every((filter) => skills.includes(filter));
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
    }

    // Update active tag styles
    filterTags.forEach((tag) => {
      tag.classList.toggle('active', activeFilters.has(tag.dataset.skill));
    });

    // Show empty state
    if (filterEmpty) {
      filterEmpty.style.display = visibleCount === 0 ? '' : 'none';
    }
  }`;

const newUpdateFilter = `function updateFilter() {
    const cards = projectCards();
    let visibleCount = 0;

    if (activeFilters.size === 0 && !activeType) {
      cards.forEach((card) => { card.style.display = ''; });
      visibleCount = cards.length;
    } else {
      cards.forEach((card) => {
        const skills = (card.dataset.projectSkills || '').split(',');
        const matchesType = !activeType || card.dataset.projectType === activeType;
        const matchesSkills = activeFilters.size === 0 || [...activeFilters].every((filter) => skills.includes(filter));
        const matches = matchesType && matchesSkills;
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
    }

    // Update active tag styles
    filterTags.forEach((tag) => {
      tag.classList.toggle('active', activeFilters.has(tag.dataset.skill));
    });

    // Show empty state
    if (filterEmpty) {
      filterEmpty.style.display = visibleCount === 0 ? '' : 'none';
    }
  }`;

filter = filter.replace(oldUpdateFilter, newUpdateFilter);

// Add type tab click handler
filter = filter.replace(
  'filterClear?.addEventListener(\'click\', () => {',
  'document.querySelectorAll(\'.type-tab\').forEach((tab) => {\n    tab.addEventListener(\'click\', () => {\n      activeType = tab.dataset.type;\n      updateTypeTabs();\n      updateFilter();\n    });\n  });\n\n  filterClear?.addEventListener(\'click\', () => {'
);

// Modify clear button to also reset type
filter = filter.replace(
  'filterClear?.addEventListener(\'click\', () => {\n    activeFilters.clear();\n    activeGenre = \'all\';\n    updateGenreTabs();\n    updateChips();\n    updateFilter();',
  'filterClear?.addEventListener(\'click\', () => {\n    activeFilters.clear();\n    activeType = \'\';\n    activeGenre = \'all\';\n    updateGenreTabs();\n    updateTypeTabs();\n    updateChips();\n    updateFilter();'
);

// Add CSS for type tabs before the closing </style>
filter = filter.replace(
  '</style>',
  `.type-tabs {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin-bottom: 0.75rem;\n  }\n  .type-tab {\n    background: var(--color-tag-bg);\n    color: var(--color-text);\n    border: 1px solid var(--color-border);\n    padding: 0.45rem 1rem;\n    border-radius: 20px;\n    font-size: 0.85rem;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    white-space: nowrap;\n  }\n  .type-tab:hover {\n    opacity: 0.85;\n  }\n  .type-tab.active {\n    background: var(--color-accent);\n    color: #fff;\n    border-color: var(--color-accent);\n  }\n</style>`
);

fs.writeFileSync('src/components/SkillFilter.astro', filter);
console.log('✓ SkillFilter.astro updated');

console.log('\nDone! Run npm run build to verify.');
```
