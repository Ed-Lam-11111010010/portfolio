import projects from './projects.json';

const SKILL_CATEGORIES = {
  'Languages': ['python', 'javascript', 'html/css', 'c', 'gdscript'],
  'Frameworks & Engines': ['phaser.js', 'godot', 'pygame'],
  'AI & ML': ['gemini api', 'ai/ml'],
  'Creative & Design': ['game design', 'graphic design', 'affinity designer', 'pixel art', 'aseprite', 'photoshop', 'logo design', 'creative writing', 'ttrpg design', 'worldbuilding', 'content creation', 'script writing'],
  'Tools & Platforms': ['wix', 'wordpress', 'readthedocs', 'sphinx', 'tabletop simulator', 'git', 'cli tools', 'product/website setup'],
  'Development': ['web dev', 'embedded systems', 'arm/stm32', 'microcontroller programming', 'testing', 'pytest'],
  'Multimedia': ['video production', 'video editing', 'voice over', 'subtitling'],
  'Leadership & Management': ['event management', 'leadership', 'budgeting', 'team management', 'documentation']
};

/**
 * Returns all unique skills sorted alphabetically
 */
export function getAllSkills() {
  const skills = new Set(projects.flatMap((p) => p.skills));
  return [...skills].sort();
}

/**
 * Returns categorized skills: { category: [skill, ...], ... }
 * Skills that don't match any category go into "Other"
 */
export function getSkillCategories() {
  const allSkills = getAllSkills();
  const categorized = {};
  const uncategorized = [];

  for (const skill of allSkills) {
    let found = false;
    for (const [category, categorySkills] of Object.entries(SKILL_CATEGORIES)) {
      if (categorySkills.includes(skill)) {
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(skill);
        found = true;
        break;
      }
    }
    if (!found) uncategorized.push(skill);
  }

  if (uncategorized.length > 0) {
    categorized['Other'] = uncategorized;
  }

  return categorized;
}
