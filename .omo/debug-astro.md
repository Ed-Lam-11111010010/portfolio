```cjs
const fs = require('fs');
const s = fs.readFileSync('src/pages/projects/[id].astro', 'utf8');
const lines = s.split('\n');
console.log('Total lines:', lines.length);
console.log('Last 5 lines:');
for (let i = Math.max(0, lines.length - 5); i < lines.length; i++) {
  console.log((i+1) + ': len=' + lines[i].length + ' ' + JSON.stringify(lines[i]));
}
// Count backticks
let bt = 0;
for (let i = 0; i < s.length; i++) {
  if (s.charCodeAt(i) === 96) bt++; // backtick = charCode 96
}
console.log('Backtick count:', bt, '(should be even)');

// Check if the replace worked properly
console.log('\n--- Checking for unique markers ---');
console.log('Contains project-detail-page:', s.includes('project-detail-page'));
console.log('Contains detail-sidebar:', s.includes('detail-sidebar'));
console.log('Contains </BaseLayout>:', s.includes('</BaseLayout>'));
console.log('Contains original closing pattern:', s.includes('{/if}') || s.includes('{/each}'));
console.log('\nFirst 500 chars:');
console.log(s.substring(0, 500));
```
