import skillsData from './skills.json';
import projects from './projects.json';

// Lookup of every skill by slug and by lower-cased name.
const index = new Map();
for (const genre of skillsData.genres) {
  for (const skill of genre.skills) {
    const entry = { genreName: genre.name, genreSlug: genre.slug, skillName: skill.name, skillSlug: skill.slug };
    index.set(skill.slug, entry);
    index.set(skill.name.toLowerCase(), entry);
  }
}

/** Resolve a project tag to its skill. Throws on unknown tags so a typo fails the build. */
export function resolveSkill(tag) {
  const entry = index.get(tag) || index.get(String(tag).toLowerCase());
  if (!entry) {
    throw new Error(`Unknown skill tag "${tag}". Add it to src/data/skills.json or fix the tag in projects.json.`);
  }
  return entry;
}

// Validate every project tag at build time.
for (const project of projects) {
  for (const tag of project.skills) resolveSkill(tag);
}

export const findGenreForSkill = resolveSkill;
export const getSkillSlug = (tag) => resolveSkill(tag).skillSlug;

/** Slugs of a project's skills. */
export const projectSkillSlugs = (project) => project.skills.map(getSkillSlug);

/** Projects that use a skill (by slug), in site order. */
export const projectsForSkill = (slug) => siteOrder().filter((p) => projectSkillSlugs(p).includes(slug));

/** Skill areas with the skills projects use, most-used first; each skill lists its projects. */
export function getGenres() {
  return skillsData.genres
    .map((genre) => ({
      ...genre,
      skills: genre.skills
        .map((skill, i) => ({ ...skill, i, projectIds: projectsForSkill(skill.slug).map((p) => p.id) }))
        .filter((skill) => skill.projectIds.length > 0)
        .sort((a, b) => b.projectIds.length - a.projectIds.length || a.i - b.i),
    }))
    .filter((genre) => genre.skills.length > 0);
}

/** Featured projects in their set order, then the rest, then small exercises. */
export function siteOrder() {
  const featured = projects.filter((p) => p.featured).sort((a, b) => a.featured - b.featured);
  return [...featured, ...projects.filter((p) => !p.featured && !p.minor), ...projects.filter((p) => p.minor)];
}

/** The projects before and after this one in site order (wrapping around). */
export function neighbours(id) {
  const list = siteOrder();
  const i = list.findIndex((p) => p.id === id);
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

const CATEGORY_LABELS = {
  'ai-game-dev': 'AI game',
  'game-dev': 'Game',
  'game-design': 'Board game',
  'web-dev': 'Web',
  programming: 'Programming',
  documentation: 'Documentation',
  multimedia: 'Video',
  creative: 'Creative',
  leadership: 'Leadership',
};

/** Human-readable label for a project category slug. */
export const categoryLabel = (category) =>
  CATEGORY_LABELS[category] || category.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
