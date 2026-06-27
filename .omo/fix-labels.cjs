var fs = require('fs');
var fp = 'src/styles/global.css';
var css = fs.readFileSync(fp, 'utf8');

// 1. Add white-space: nowrap to detail year/type/category spans
css = css.replace(
  'padding: 0.2rem 0.6rem;\n  border-radius: 4px;\n  background: var(--color-tag-bg);\n}\n\n.detail-type {',
  'padding: 0.2rem 0.6rem;\n  border-radius: 4px;\n  background: var(--color-tag-bg);\n  white-space: nowrap;\n}\n\n.detail-type {'
);

// 2. Fix .project-card-year to use flex layout so type badge + year stay on one line
css = css.replace(
  '.project-card-year {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  margin-bottom: 0.5rem;\n}',
  '.project-card-year {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  margin-bottom: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}'
);

// Normalize line endings
css = css.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
fs.writeFileSync(fp, css, 'utf8');
console.log('CSS label fixes applied');

