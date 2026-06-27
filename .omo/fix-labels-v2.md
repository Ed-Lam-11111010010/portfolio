```cjs
var fs = require('fs');
var fp = 'src/styles/global.css';
var css = fs.readFileSync(fp, 'utf8');

// Add white-space: nowrap to the .detail-year block
var target = '.detail-year,\n.detail-type,\n.detail-category {\n  font-size: 0.85rem;\n  color: var(--color-text-secondary);\n  padding: 0.2rem 0.6rem;\n  border-radius: 4px;\n  background: var(--color-tag-bg);\n}';

var replacement = '.detail-year,\n.detail-type,\n.detail-category {\n  font-size: 0.85rem;\n  color: var(--color-text-secondary);\n  padding: 0.2rem 0.6rem;\n  border-radius: 4px;\n  background: var(--color-tag-bg);\n  white-space: nowrap;\n}';

if (css.includes(target)) {
  css = css.replace(target, replacement);
  console.log('Added white-space: nowrap to detail-meta labels');
} else {
  console.log('ERROR: target not found in CSS');
  // Debug - show what's around .detail-year
  var idx = css.indexOf('.detail-year');
  if (idx >= 0) {
    console.log('Found at index:', idx);
    console.log('Surrounding text:', JSON.stringify(css.substring(idx, idx + 200)));
  }
}

// Fix .project-card-year
var pcy = '.project-card-year {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  margin-bottom: 0.5rem;\n}';
var pcy_new = '.project-card-year {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  margin-bottom: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}';

if (css.includes(pcy)) {
  css = css.replace(pcy, pcy_new);
  console.log('Added flex to .project-card-year');
} else {
  console.log('ERROR: .project-card-year target not found');
  var idx = css.indexOf('.project-card-year');
  if (idx >= 0) {
    console.log('Found at index:', idx);
    console.log('Surrounding text:', JSON.stringify(css.substring(idx, idx + 150)));
  }
}

css = css.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
fs.writeFileSync(fp, css, 'utf8');
console.log('DONE');
```
