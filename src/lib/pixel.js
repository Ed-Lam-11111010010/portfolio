// Small pixel-art toolkit used to draw project covers, the hero monogram and UI icons as crisp SVG.
// '#' = ink, 'o' = light fill, any other character = transparent.

export const PALETTE = {
  navy: '#1D2B53', plum: '#7E2553', forest: '#008751', brown: '#AB5236',
  slate: '#5F574F', silver: '#C2C3C7', paper: '#FFF1E8', red: '#FF004D',
  orange: '#FFA300', yellow: '#FFEC27', green: '#00E436', blue: '#29ADFF',
  lavender: '#83769C', pink: '#FF77A8', peach: '#FFCCAA',
};

const G = {
  gamepad: [
    '............', '............', '............', '.##########.',
    '#oooooooooo#', '#o#oooooo#o#', '###ooooo#o##', '#o#oooooo#o#',
    '#oooooooooo#', '#ooo####ooo#', '.###....###.', '............',
  ],
  robot: [
    '.....##.....', '.....##.....', '..########..', '.#oooooooo#.',
    '.#o##oo##o#.', '.#o##oo##o#.', '.#oooooooo#.', '.#oo####oo#.',
    '.#oooooooo#.', '..########..', '...#....#...', '..##....##..',
  ],
  die: [
    '.##########.', '#oooooooooo#', '#o##oooo##o#', '#o##oooo##o#',
    '#oooooooooo#', '#oooo##oooo#', '#oooo##oooo#', '#oooooooooo#',
    '#o##oooo##o#', '#o##oooo##o#', '#oooooooooo#', '.##########.',
  ],
  browser: [
    '############', '############', '#oooooooooo#', '#o#####oooo#',
    '#oooooooooo#', '#o#######oo#', '#oooooooooo#', '#o######ooo#',
    '#oooooooooo#', '#oooooooooo#', '############', '............',
  ],
  terminal: [
    '############', '############', '#oooooooooo#', '#o#oooooooo#',
    '#oo#ooooooo#', '#ooo#oooooo#', '#oo#ooooooo#', '#o#oo####oo#',
    '#oooooooooo#', '#oooooooooo#', '############', '............',
  ],
  play: [
    '############', '#oooooooooo#', '#ooo#oooooo#', '#ooo##ooooo#',
    '#ooo###oooo#', '#ooo####ooo#', '#ooo###oooo#', '#ooo##ooooo#',
    '#ooo#oooooo#', '#oooooooooo#', '############', '............',
  ],
  heart: [
    '............', '.###...###..', '#ooo#.#ooo#.', '#oooo#oooo#.',
    '#ooooooooo#.', '.#ooooooo#..', '..#ooooo#...', '...#ooo#....',
    '....#o#.....', '.....#......', '............', '............',
  ],
  flag: [
    '.#..........', '.##########.', '.#oooooooo#.', '.#oooooooo#.',
    '.#oooooo##..', '.#########..', '.#..........', '.#..........',
    '.#..........', '.#..........', '###.........', '............',
  ],
  page: [
    '.#######....', '.#ooooo##...', '.#ooooo#o#..', '.#ooooo####.',
    '.#o#####oo#.', '.#oooooooo#.', '.#o######o#.', '.#oooooooo#.',
    '.#o#####oo#.', '.#oooooooo#.', '.##########.', '............',
  ],
};

// Scene colours and icon per project category.
const SCENES = {
  'ai-game-dev': { sky: 'plum', back: 'pink', ground: 'navy', glyph: 'robot', night: true },
  'game-dev': { sky: 'blue', back: 'green', ground: 'forest', glyph: 'gamepad' },
  'game-design': { sky: 'orange', back: 'peach', ground: 'brown', glyph: 'die' },
  'web-dev': { sky: 'lavender', back: 'silver', ground: 'slate', glyph: 'browser' },
  programming: { sky: 'navy', back: 'blue', ground: 'forest', glyph: 'terminal', night: true },
  documentation: { sky: 'silver', back: 'paper', ground: 'lavender', glyph: 'page' },
  multimedia: { sky: 'red', back: 'orange', ground: 'plum', glyph: 'play' },
  creative: { sky: 'pink', back: 'peach', ground: 'brown', glyph: 'heart' },
  leadership: { sky: 'yellow', back: 'orange', ground: 'brown', glyph: 'flag' },
};

function hash(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return h >>> 0;
}

function rng(seed) {
  let s = seed || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

/** Turn a list of {x, y, c} cells into SVG rects, merging horizontal runs of one colour. */
function toRects(cells) {
  const rows = new Map();
  for (const cell of cells) {
    if (!rows.has(cell.y)) rows.set(cell.y, new Map());
    rows.get(cell.y).set(cell.x, cell.c);
  }
  let out = '';
  for (const [y, row] of rows) {
    const xs = [...row.keys()].sort((a, b) => a - b);
    let i = 0;
    while (i < xs.length) {
      const start = xs[i];
      const color = row.get(start);
      let end = start;
      while (i + 1 < xs.length && xs[i + 1] === end + 1 && row.get(xs[i + 1]) === color) { i++; end++; }
      out += `<rect x="${start}" y="${y}" width="${end - start + 1}" height="1" fill="${color}"/>`;
      i++;
    }
  }
  return out;
}

function glyphCells(name, ox, oy, ink, fill) {
  const cells = [];
  G[name].forEach((row, y) => {
    [...row.padEnd(12, '.')].forEach((ch, x) => {
      if (ch === '#') cells.push({ x: ox + x, y: oy + y, c: ink });
      else if (ch === 'o') cells.push({ x: ox + x, y: oy + y, c: fill });
    });
  });
  return cells;
}

/** A 48x27 pixel scene for a project, seeded by its id so it never changes between builds. */
export function coverSvg(id, category, title = '') {
  const W = 48, H = 27;
  const scene = SCENES[category] || SCENES['game-dev'];
  const rand = rng(hash(id));
  const P = PALETTE;
  const cells = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) cells.push({ x, y, c: P[scene.sky] });

  // Stars at night, clouds by day.
  for (let n = 0; n < 7; n++) {
    const x = Math.floor(rand() * (W - 3)), y = Math.floor(rand() * 9);
    if (scene.night) cells.push({ x, y, c: P.paper });
    else for (let k = 0; k < 3 + Math.floor(rand() * 3); k++) cells.push({ x: x + k, y, c: P.paper });
  }

  // Two layers of stepped hills.
  const layer = (base, spread, color) => {
    let h = base + Math.floor(rand() * spread);
    for (let x = 0; x < W; x++) {
      if (rand() < 0.3) h = Math.max(base - 1, Math.min(base + spread, h + (rand() < 0.5 ? -1 : 1)));
      for (let y = H - h; y < H; y++) cells.push({ x, y, c: color });
    }
  };
  layer(8, 5, P[scene.back]);
  layer(4, 3, P[scene.ground]);

  // Category icon with a drop shadow, centred.
  const ox = 18, oy = 6;
  cells.push(...glyphCells(scene.glyph, ox + 1, oy + 1, P.navy, P.navy));
  cells.push(...glyphCells(scene.glyph, ox, oy, P.navy, P.paper));

  const label = title ? `Pixel-art cover for ${title}` : 'Pixel-art project cover';
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="${label.replace(/"/g, '&quot;')}">${toRects(cells)}</svg>`;
}

const FONT = {
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
};

/** The hero monogram: "EL" on a small pixel landscape. */
export function monogramSvg() {
  const W = 20, H = 20, P = PALETTE;
  const cells = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) cells.push({ x, y, c: y < 14 ? P.blue : y < 16 ? P.green : P.forest });
  [[2, 2], [3, 2], [4, 2], [13, 3], [14, 3], [15, 3], [16, 3]].forEach(([x, y]) => cells.push({ x, y, c: P.paper }));
  const letter = (ch, ox, oy) => FONT[ch].forEach((row, y) => [...row].forEach((v, x) => {
    if (v === '#') { cells.push({ x: ox + x + 1, y: oy + y + 1, c: P.navy }); }
  }));
  const top = (ch, ox, oy) => FONT[ch].forEach((row, y) => [...row].forEach((v, x) => {
    if (v === '#') cells.push({ x: ox + x, y: oy + y, c: P.yellow });
  }));
  letter('E', 3, 6); letter('L', 11, 6);
  top('E', 3, 6); top('L', 11, 6);
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="Pixel-art monogram EL">${toRects(cells)}</svg>`;
}

const ICONS = {
  mail: ['........', '########', '##....##', '#.#..#.#', '#..##..#', '#......#', '########', '........'],
  sun: ['...#....', '.#...#..', '...##...', '#.####.#', '..####..', '...##...', '.#...#..', '...#....'],
  moon: ['..###...', '.##.....', '##......', '##......', '##......', '.##...#.', '..####..', '........'],
  menu: ['........', '########', '........', '########', '........', '########', '........', '........'],
  close: ['#......#', '.#....#.', '..#..#..', '...##...', '...##...', '..#..#..', '.#....#.', '#......#'],
  up: ['...##...', '..####..', '.######.', '...##...', '...##...', '...##...', '...##...', '........'],
  left: ['...#....', '..##....', '.#######', '########', '.#######', '..##....', '...#....', '........'],
  out: ['....####', '......##', '.....#.#', '....#..#', '...#....', '##......', '##......', '########'],
};

/** An 8x8 pixel icon that takes the current text colour. */
export function iconSvg(name, size = 16) {
  const rows = ICONS[name];
  let rects = '';
  rows.forEach((row, y) => [...row].forEach((v, x) => { if (v === '#') rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
  return `<svg width="${size}" height="${size}" viewBox="0 0 8 8" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
}
