// Pixel-art toolkit: project covers and banners, list icons, the hero landscape and UI icons,
// all drawn as crisp SVG rects at build time. Nothing here runs in the browser.

export const PALETTE = {
  navy: '#1D2B53', plum: '#7E2553', forest: '#008751', brown: '#AB5236',
  slate: '#5F574F', silver: '#C2C3C7', paper: '#FFF1E8', red: '#E00045',
  orange: '#FFA300', yellow: '#FFEC27', green: '#00E436', blue: '#29ADFF',
  lavender: '#83769C', pink: '#FF77A8', peach: '#FFCCAA', ink: '#0B1230',
};

// One letter per colour in the sprite grids below; '.' is transparent.
const KEY = {
  N: 'navy', U: 'plum', F: 'forest', W: 'brown', S: 'slate', V: 'silver', P: 'paper', R: 'red',
  O: 'orange', Y: 'yellow', G: 'green', B: 'blue', L: 'lavender', K: 'pink', E: 'peach',
};

// Category icons used when a project has no art of its own ('#' ink, 'o' light fill).
const GLYPHS = {
  gamepad: ['............', '............', '............', '.##########.', '#oooooooooo#', '#o#oooooo#o#', '###ooooo#o##', '#o#oooooo#o#', '#oooooooooo#', '#ooo####ooo#', '.###....###.', '............'],
  robot: ['.....##.....', '.....##.....', '..########..', '.#oooooooo#.', '.#o##oo##o#.', '.#o##oo##o#.', '.#oooooooo#.', '.#oo####oo#.', '.#oooooooo#.', '..########..', '...#....#...', '..##....##..'],
  die: ['.##########.', '#oooooooooo#', '#o##oooo##o#', '#o##oooo##o#', '#oooooooooo#', '#oooo##oooo#', '#oooo##oooo#', '#oooooooooo#', '#o##oooo##o#', '#o##oooo##o#', '#oooooooooo#', '.##########.'],
  browser: ['############', '############', '#oooooooooo#', '#o#####oooo#', '#oooooooooo#', '#o#######oo#', '#oooooooooo#', '#o######ooo#', '#oooooooooo#', '#oooooooooo#', '############', '............'],
  terminal: ['############', '############', '#oooooooooo#', '#o#oooooooo#', '#oo#ooooooo#', '#ooo#oooooo#', '#oo#ooooooo#', '#o#oo####oo#', '#oooooooooo#', '#oooooooooo#', '############', '............'],
  play: ['############', '#oooooooooo#', '#ooo#oooooo#', '#ooo##ooooo#', '#ooo###oooo#', '#ooo####ooo#', '#ooo###oooo#', '#ooo##ooooo#', '#ooo#oooooo#', '#oooooooooo#', '############', '............'],
  heart: ['............', '.###...###..', '#ooo#.#ooo#.', '#oooo#oooo#.', '#ooooooooo#.', '.#ooooooo#..', '..#ooooo#...', '...#ooo#....', '....#o#.....', '.....#......', '............', '............'],
  flag: ['.#..........', '.##########.', '.#oooooooo#.', '.#oooooooo#.', '.#oooooo##..', '.#########..', '.#..........', '.#..........', '.#..........', '.#..........', '###.........', '............'],
  page: ['.#######....', '.#ooooo##...', '.#ooooo#o#..', '.#ooooo####.', '.#o#####oo#.', '.#oooooooo#.', '.#o######o#.', '.#oooooooo#.', '.#o#####oo#.', '.#oooooooo#.', '.##########.', '............'],
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

// Letters for the Wordle tiles (3x5).
const MINI = {
  P: ['###', '#.#', '###', '#..', '#..'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  X: ['#.#', '#.#', '.#.', '#.#', '#.#'],
  E: ['###', '#..', '##.', '#..', '###'],
  L: ['#..', '#..', '#..', '#..', '###'],
};

function wordleRow(word, colors) {
  const rows = Array.from({ length: 7 }, () => '');
  [...word].forEach((ch, i) => {
    const bg = colors[i];
    const fg = bg === 'S' ? 'P' : 'N';
    for (let r = 0; r < 7; r++) {
      let line = '';
      for (let c = 0; c < 7; c++) {
        const inGlyph = r >= 1 && r <= 5 && c >= 2 && c <= 4;
        line += inGlyph && MINI[ch][r - 1][c - 2] === '#' ? fg : bg;
      }
      rows[r] += (i ? '.' : '') + line;
    }
  });
  return rows;
}

// Art drawn for individual projects, on the 48x27 cover grid. Sprites sit on top of the scene.
const ART = {
  'ai-guild-master-fyp': {
    scene: { sky: 'plum', back: 'pink', ground: 'navy', night: true },
    sprites: [{ x: 19, y: 4, rows: [
      '....NN....', '....NN....', 'NNNNNNNNNN', 'NPPPPPPPPN', 'NPPPPPPPPN', 'NPPNPPNPPN', 'NPPNPPNPPN',
      'NPPPPPPPPN', 'NPPNNNNPPN', 'NPPPPPPPPN', 'NPPPPPPPPN', 'NNNNNNNNNN', '..NN..NN..', '..NN..NN..', '..NN..NN..',
    ] }],
  },
  'dino-island-rnw': {
    scene: { sky: 'blue', back: 'green', ground: 'forest' },
    sprites: [{ x: 14, y: 9, rows: [
      '............NNNNNN', '............NPPNPN', '............NPPPPN', '..........NNNNNNNN',
      '..........NPPNNN..', 'NNNN......NPPN....', 'NNNNNNNNNNNPPN....', '...NPPPPPPPPPN....',
      '...NPPPPPPPNNN....', '...NNNNNNNN.......', '.....NN..NN.......', '.....NN..NN.......',
      '.....NN..NN.......', '.....NN..NN.......',
    ] }],
  },
  'wordle-neo': {
    scene: { sky: 'navy', night: true, dimStars: true, hills: false },
    sprites: [{ x: 5, y: 10, rows: wordleRow('PIXEL', ['G', 'Y', 'S', 'G', 'S']) }],
  },
  'innoport-board-game': {
    scene: { sky: 'orange', hills: false, table: { y: 20, top: 'peach', color: 'brown' } },
    sprites: [
      { x: 18, y: 5, rows: [
        'NNNNNNNNNNNN.', 'NPPPPPPPPPPNN', 'NPNNPPPPNNPNN', 'NPNNPPPPNNPNN', 'NPPPPPPPPPPNN',
        'NPPPPRRPPPPNN', 'NPPPPRRPPPPNN', 'NPPPPPPPPPPNN', 'NPPPPPPPPPPNN', 'NPNNPPPPNNPNN',
        'NPNNPPPPNNPNN', 'NPPPPPPPPPPNN', 'NNNNNNNNNNNNN', '.NNNNNNNNNNNN',
      ] },
      { x: 34, y: 15, rows: ['NNNNN', 'BBBBB', 'BBBBB', 'BBBBB', 'BBBBB'] },
      { x: 9, y: 16, rows: ['NNNNNN', 'GGGGGG', 'GGGGGG', 'GGGGGG'] },
    ],
  },
};

// 8x8 icons for the project list.
const ICONS8 = {
  'sushiro-counter': ['LLLLLLLL', 'LLLLLLLL', 'LLNNNNLL', 'LLPPPPLL', 'LLPPPPLL', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS'],
  'jewel-smash-game': ['BBBBBBBB', 'BBBBBBBB', 'BRRYYGGB', 'BRRYYGGB', 'BBYYRRBB', 'BBYYRRBB', 'FFFFFFFF', 'FFFFFFFF'],
  'christmas-game-2025': ['NNNNNNNN', 'NNNYYNNN', 'NNNFFNNN', 'NNRFFFNN', 'NFFFFFFN', 'NNNWWNNN', 'PPPPPPPP', 'PPPPPPPP'],
  'ierg-4210-web-project': ['LLLLLLLL', 'LNNNNNNL', 'LPPPPPPL', 'LPNNNPPL', 'LPPPPPPL', 'LPNNNNPL', 'LPPPPPPL', 'LLLLLLLL'],
  'infotainment-video-production': ['RRRRRRRR', 'RPPPPPPR', 'RPPNPPPR', 'RPPNNPPR', 'RPPNNPPR', 'RPPNPPPR', 'RPPPPPPR', 'RRRRRRRR'],
  'pixel-art-graphic-design': ['KKKKKKKK', 'KKKKKKKK', 'KNNKKNNK', 'KNNNNNNK', 'KNNNNNNK', 'KKNNNNKK', 'KKKNNKKK', 'KKKKKKKK'],
  'dnd-empire-ants': ['EEEEEEEE', 'EEEEEEEE', 'ENEEEEEE', 'EENNEEEE', 'EENNNNEE', 'EEEENNEE', 'WWWWWWWW', 'WWWWWWWW'],
  'intern-life-2024': ['VVVVVVVV', 'VVNNNNVV', 'VVPPPPVV', 'VVPNNPVV', 'VVPPPPVV', 'VVPNNPVV', 'VVPPPPVV', 'VVVVVVVV'],
  'c-programming-university': ['NNNNNNNN', 'NNNNNNNN', 'NGNNNNNN', 'NNGNNNNN', 'NGNNGGGN', 'NNNNNNNN', 'NNNNNNNN', 'NNNNNNNN'],
  'film-society-yingto': ['YYYYYYYY', 'YYNRRRRY', 'YYNRRRRY', 'YYNRRRRY', 'YYNYYYYY', 'YYNYYYYY', 'YYNYYYYY', 'YYYYYYYY'],
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

/** Turn {x, y, c} cells into SVG rects; later cells win; horizontal runs of one colour merge. */
function toRects(cells) {
  const grid = new Map();
  for (const cell of cells) grid.set(`${cell.x},${cell.y}`, cell);
  const rows = new Map();
  for (const { x, y, c } of grid.values()) {
    if (!rows.has(y)) rows.set(y, new Map());
    rows.get(y).set(x, c);
  }
  let out = '';
  for (const [y, row] of [...rows].sort((a, b) => a[0] - b[0])) {
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

const fillRect = (cells, x, y, w, h, c) => {
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) cells.push({ x: i, y: j, c });
};

const spriteCells = (rows, ox, oy) => {
  const cells = [];
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (KEY[ch]) cells.push({ x: ox + x, y: oy + y, c: PALETTE[KEY[ch]] });
  }));
  return cells;
};

const glyphCells = (name, ox, oy, ink, fill) => {
  const cells = [];
  GLYPHS[name].forEach((row, y) => [...row.padEnd(12, '.')].forEach((ch, x) => {
    if (ch === '#') cells.push({ x: ox + x, y: oy + y, c: ink });
    else if (ch === 'o') cells.push({ x: ox + x, y: oy + y, c: fill });
  }));
  return cells;
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * A pixel scene for a project. The default 48x27 grid is a 16:9 cover; pass a wider grid
 * (e.g. { w: 120, h: 30 }) for a page banner. Seeded by the project id, so it never changes.
 */
export function coverSvg(project, { w: W = 48, h: H = 27, label } = {}) {
  const art = ART[project.id];
  const base = SCENES[project.category] || SCENES['game-dev'];
  const scene = { hills: true, ...base, ...(art ? art.scene : {}) };
  const rand = rng(hash(`${project.id}:${W}x${H}`));
  const P = PALETTE;
  const dx = Math.round((W - 48) / 2);
  const dy = H - 27;
  const cells = [];
  fillRect(cells, 0, 0, W, H, P[scene.sky]);

  const count = Math.round((W * 7) / 48);
  for (let n = 0; n < count; n++) {
    const x = Math.floor(rand() * (W - 4));
    const y = Math.floor(rand() * Math.max(4, H * 0.33));
    if (scene.night) cells.push({ x, y, c: scene.dimStars ? P.lavender : P.paper });
    else {
      const len = 3 + Math.floor(rand() * 4);
      fillRect(cells, x, y, len, 1, P.paper);
      if (len > 4 && y > 0) fillRect(cells, x + 1, y - 1, len - 3, 1, P.paper);
    }
  }

  if (scene.hills) {
    const layer = (baseH, spread, color, rim) => {
      let h = baseH + Math.floor(rand() * spread);
      for (let x = 0; x < W; x++) {
        if (rand() < 0.3) h = Math.max(baseH - 1, Math.min(baseH + spread, h + (rand() < 0.5 ? -1 : 1)));
        fillRect(cells, x, H - h, 1, h, color);
        if (rim) cells.push({ x, y: H - h, c: rim });
      }
    };
    layer(8, 5, P[scene.back]);
    layer(4, 3, P[scene.ground]);
  }
  if (scene.table) {
    const t = scene.table;
    fillRect(cells, 0, t.y + dy, W, H - t.y - dy, P[t.color]);
    fillRect(cells, 0, t.y + dy, W, 1, P[t.top]);
  }

  if (art) {
    for (const s of art.sprites) cells.push(...spriteCells(s.rows, s.x + dx, s.y + dy));
  } else {
    const ox = 18 + dx, oy = 6 + dy;
    cells.push(...glyphCells(scene.glyph, ox + 1, oy + 1, P.navy, P.navy));
    cells.push(...glyphCells(scene.glyph, ox, oy, P.navy, P.paper));
  }

  const text = label || `Pixel art for ${project.title}`;
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" preserveAspectRatio="xMidYMax slice" role="img" aria-label="${esc(text)}">${toRects(cells)}</svg>`;
}

/** An 8x8 pixel icon for the project list. Decorative: the row's text names the project. */
export function listIconSvg(project) {
  const rows = ICONS8[project.id];
  let cells;
  if (rows) cells = spriteCells(rows, 0, 0);
  else {
    const scene = SCENES[project.category] || SCENES['game-dev'];
    cells = [];
    fillRect(cells, 0, 0, 8, 8, PALETTE[scene.sky]);
    fillRect(cells, 0, 6, 8, 2, PALETTE[scene.ground]);
  }
  return `<svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${toRects(cells)}</svg>`;
}

/** The hero's horizon: mountains, hills and a goal flag on a 240x30 grid. */
export function horizonSvg() {
  const P = PALETTE, W = 240, H = 30;
  const cells = [];
  fillRect(cells, 0, 0, W, H, P.navy);
  [[6, 2, 'paper'], [19, 5, 'lavender'], [37, 1, 'paper'], [58, 3, 'lavender'], [83, 1, 'paper'], [109, 4, 'lavender'],
   [131, 1, 'paper'], [149, 3, 'lavender'], [171, 2, 'paper'], [188, 4, 'lavender'], [217, 1, 'paper'], [233, 3, 'lavender']]
    .forEach(([x, y, c]) => cells.push({ x, y, c: P[c] }));
  [[0, 12, 14], [14, 9, 10], [24, 6, 8], [32, 9, 12], [44, 4, 10], [54, 8, 14], [68, 11, 12], [80, 7, 10],
   [90, 3, 12], [102, 8, 10], [112, 10, 16], [128, 6, 10], [138, 9, 12], [150, 5, 10], [160, 8, 14],
   [174, 11, 10], [184, 7, 12], [196, 4, 10], [206, 8, 12], [218, 10, 10], [228, 7, 12]]
    .forEach(([x, y, w]) => fillRect(cells, x, y, w, H - y, P.plum));
  [[0, 19, 20], [20, 17, 18], [38, 20, 22], [60, 16, 16], [76, 18, 24], [100, 15, 18], [118, 18, 20],
   [138, 16, 16], [154, 19, 22], [176, 17, 18], [194, 15, 20], [214, 18, 26]]
    .forEach(([x, y, w]) => { fillRect(cells, x, y, w, H - y, P.forest); fillRect(cells, x, y, w, 1, P.green); });
  fillRect(cells, 200, 6, 1, 9, P.paper);
  fillRect(cells, 201, 6, 5, 3, P.red);
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${toRects(cells)}</svg>`;
}

/** The moon over the hero copy. */
export function moonSvg() {
  const P = PALETTE, cells = [];
  fillRect(cells, 1, 0, 6, 1, P.yellow); fillRect(cells, 0, 1, 8, 5, P.yellow); fillRect(cells, 1, 6, 6, 1, P.yellow);
  fillRect(cells, 2, 2, 2, 1, P.orange); cells.push({ x: 5, y: 4, c: P.orange });
  return `<svg viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${toRects(cells)}</svg>`;
}

const UI = {
  mail: ['........', '########', '##....##', '#.#..#.#', '#..##..#', '#......#', '########', '........'],
  sun: ['...#....', '.#...#..', '...##...', '#.####.#', '..####..', '...##...', '.#...#..', '...#....'],
  moon: ['..###...', '.##.....', '##......', '##......', '##......', '.##...#.', '..####..', '........'],
  menu: ['........', '########', '........', '########', '........', '########', '........', '........'],
  close: ['#......#', '.#....#.', '..#..#..', '...##...', '...##...', '..#..#..', '.#....#.', '#......#'],
  up: ['...##...', '..####..', '.######.', '...##...', '...##...', '...##...', '...##...', '........'],
  left: ['...#....', '..##....', '.#######', '########', '.#######', '..##....', '...#....', '........'],
  right: ['....#...', '....##..', '#######.', '########', '#######.', '....##..', '....#...', '........'],
  out: ['....####', '......##', '.....#.#', '....#..#', '...#....', '##......', '##......', '########'],
};

/** An 8x8 UI icon that takes the current text colour. */
export function iconSvg(name, size = 16) {
  let rects = '';
  UI[name].forEach((row, y) => [...row].forEach((v, x) => { if (v === '#') rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
  return `<svg width="${size}" height="${size}" viewBox="0 0 8 8" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
}
