import skillsData from './skills.json';
import projects from './projects.json';

/**
 * Returns the full skills hierarchy (genres, each with skills array)
 */
export function getGenres() {
  return skillsData.genres;
}

/**
 * Given a skill slug, find its genre info.
 * Returns { genreName, genreSlug, skillName, skillSlug } or null if not found.
 */
export function getSkillGenre(skillSlug) {
  for (const genre of skillsData.genres) {
    for (const skill of genre.skills) {
      if (skill.slug === skillSlug) {
        return {
          genreName: genre.name,
          genreSlug: genre.slug,
          skillName: skill.name,
          skillSlug: skill.slug
        };
      }
    }
  }
  return null;
}

/**
 * Given a raw skill tag from projects.json (e.g. "python", "phaser.js"),
 * look up its slug in the hierarchy by matching the skill slug.
 * Falls back to slugified version of the tag if not found.
 */
export function getSkillSlug(tag) {
  for (const genre of skillsData.genres) {
    for (const skill of genre.skills) {
      if (skill.slug === tag || skill.name.toLowerCase() === tag.toLowerCase()) {
        return skill.slug;
      }
    }
  }
  return tag.replace(/[\s/]+/g, '-').toLowerCase();
}

/**
 * Given a raw skill tag from projects.json, return the genre+skill info
 * by trying to match either slug or name.
 */
export function findGenreForSkill(tag) {
  for (const genre of skillsData.genres) {
    for (const skill of genre.skills) {
      if (skill.slug === tag || skill.name.toLowerCase() === tag.toLowerCase()) {
        return {
          genreName: genre.name,
          genreSlug: genre.slug,
          skillName: skill.name,
          skillSlug: skill.slug
        };
      }
    }
  }
  // Fallback: derive slug from tag
  return {
    genreName: 'Other',
    genreSlug: 'other',
    skillName: tag,
    skillSlug: tag.replace(/[\s/]+/g, '-').toLowerCase()
  };
}

/**
 * Returns all unique skills sorted alphabetically (flat list, for backward compat)
 */
export function getAllSkills() {
  const skills = new Set(projects.flatMap((p) => p.skills));
  return [...skills].sort();
}

/**
 * Returns categorized skills: { category: [skill, ...], ... }
 * Uses the new hierarchical taxonomy. Skills with no genre mapping go into "Other".
 */
export function getSkillCategories() {
  const categorized = {};
  const allTags = new Set(projects.flatMap((p) => p.skills));

  for (const genre of skillsData.genres) {
    const skillNames = genre.skills.map((s) => s.name);
    // Also include any raw tags that match this genre's skills by slug
    for (const tag of allTags) {
      const info = findGenreForSkill(tag);
      if (info.genreSlug === genre.slug) {
        if (!categorized[genre.name]) categorized[genre.name] = [];
        if (!categorized[genre.name].includes(tag)) {
          categorized[genre.name].push(tag);
        }
      }
    }
  }

  // Uncategorized
  const categorizedTags = new Set();
  for (const cat of Object.values(categorized)) {
    cat.forEach((t) => categorizedTags.add(t));
  }
  const uncategorized = [...allTags].filter((t) => !categorizedTags.has(t));
  if (uncategorized.length > 0) {
    categorized['Other'] = uncategorized;
  }

  return categorized;
}
