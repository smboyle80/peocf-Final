"use strict";

/* ================================================
   MAHJONG SOLITAIRE
   Standard 144-tile turtle layout
   ================================================ */

// Tile faces — 4 copies of each = 144 tiles total
// Tile definitions: { label, color } — dark text on colored tiles so everything is visible
const TILE_FACES = [
    // Characters 1-9 (red)
    {l:"1 Ch", c:"#c0392b"},{l:"2 Ch", c:"#c0392b"},{l:"3 Ch", c:"#c0392b"},
    {l:"4 Ch", c:"#c0392b"},{l:"5 Ch", c:"#c0392b"},{l:"6 Ch", c:"#c0392b"},
    {l:"7 Ch", c:"#c0392b"},{l:"8 Ch", c:"#c0392b"},{l:"9 Ch", c:"#c0392b"},
    // Bamboo 1-9 (green)
    {l:"1 Ba", c:"#27ae60"},{l:"2 Ba", c:"#27ae60"},{l:"3 Ba", c:"#27ae60"},
    {l:"4 Ba", c:"#27ae60"},{l:"5 Ba", c:"#27ae60"},{l:"6 Ba", c:"#27ae60"},
    {l:"7 Ba", c:"#27ae60"},{l:"8 Ba", c:"#27ae60"},{l:"9 Ba", c:"#27ae60"},
    // Circles 1-9 (blue)
    {l:"1 Ci", c:"#2980b9"},{l:"2 Ci", c:"#2980b9"},{l:"3 Ci", c:"#2980b9"},
    {l:"4 Ci", c:"#2980b9"},{l:"5 Ci", c:"#2980b9"},{l:"6 Ci", c:"#2980b9"},
    {l:"7 Ci", c:"#2980b9"},{l:"8 Ci", c:"#2980b9"},{l:"9 Ci", c:"#2980b9"},
    // Winds (dark teal)
    {l:"East", c:"#16a085"},{l:"West", c:"#16a085"},{l:"North", c:"#16a085"},{l:"South", c:"#16a085"},
    // Dragons (purple)
    {l:"🀄 Dr", c:"#8e44ad"},{l:"Gn Dr", c:"#8e44ad"},{l:"Wh Dr", c:"#8e44ad"},
    // Flowers (unique — match within group)
    {l:"🌸", c:"#e91e8c"},{l:"🌼", c:"#e91e8c"},{l:"🍀", c:"#e91e8c"},{l:"🌿", c:"#e91e8c"},
    // Seasons (unique — match within group)
    {l:"🌱", c:"#795548"},{l:"☀️",  c:"#795548"},{l:"🍂", c:"#795548"},{l:"❄️",  c:"#795548"}
];

// Standard turtle layout: [col, row, layer] — 0-indexed
// 144 positions total
function buildLayout() {
    const positions = [];

    // Layer 0 (base) — bulk of tiles
    const layer0 = [
        // Row 0
        [1,0],[3,0],[5,0],[7,0],[9,0],[11,0],[13,0],
        // Row 1
        [1,1],[3,1],[5,1],[7,1],[9,1],[11,1],[13,1],
        // Row 2
        [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],
        // Row 3
        [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],
        // Row 4
        [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],
        // Row 5
        [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],
        // Row 6
        [1,6],[3,6],[5,6],[7,6],[9,6],[11,6],[13,6],
        // Row 7
        [1,7],[3,7],[5,7],[7,7],[9,7],[11,7],[13,7],
        // Far left and right singles
        [-1,4],[15,4],
    ];
    layer0.forEach(([c,r]) => positions.push({col:c, row:r, layer:0}));

    // Layer 1
    const layer1 = [
        [2,2],[4,2],[6,2],[8,2],[10,2],[12,2],
        [2,3],[4,3],[6,3],[8,3],[10,3],[12,3],
        [2,4],[4,4],[6,4],[8,4],[10,4],[12,4],
        [2,5],[4,5],[6,5],[8,5],[10,5],[12,5],
    ];
    layer1.forEach(([c,r]) => positions.push({col:c, row:r, layer:1}));

    // Layer 2
    const layer2 = [
        [4,3],[6,3],[8,3],[10,3],
        [4,4],[6,4],[8,4],[10,4],
        [4,5],[6,5],[8,5],[10,5],
        [4,2],[6,2],[8,2],[10,2],
    ];
    layer2.forEach(([c,r]) => positions.push({col:c, row:r, layer:2}));

    // Layer 3 (top of pyramid)
    [[6,3],[8,3],[6,4],[8,4]].forEach(([c,r]) => positions.push({col:c, row:r, layer:3}));

    // Apex
    positions.push({col:7, row:3, layer:4});

    // Trim/pad to exactly 144
    while (positions.length < 144) positions.push({col:7, row:4, layer:0});
    return positions.slice(0, 144);
}

// Create tile set: 4 copies of each face except flowers/seasons (1 each unique pair)
function makeTileSet() {
    const faces = [];
    for (let i = 0; i < 27; i++) for (let k = 0; k < 4; k++) faces.push(TILE_FACES[i]);
    for (let i = 27; i < 31; i++) for (let k = 0; k < 4; k++) faces.push(TILE_FACES[i]);
    for (let i = 31; i < 34; i++) for (let k = 0; k < 4; k++) faces.push(TILE_FACES[i]);
    for (let i = 34; i < 38; i++) faces.push(TILE_FACES[i]);
    for (let i = 34; i < 38; i++) faces.push(TILE_FACES[i]);
    for (let i = 38; i < 42; i++) faces.push(TILE_FACES[i]);
    for (let i = 38; i < 42; i++) faces.push(TILE_FACES[i]);
    return shuffle(faces).slice(0, 144);
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Game state
let tiles = [];         // [{id, col, row, layer, face, el, removed}]
let selected = null;
let history = [];       // stack of removed pairs for undo
let score = 0;
let timerInterval = null;
let seconds = 0;

function tilesMatch(a, b) {
    if (a.face.l === b.face.l) return true;
    // Flowers and seasons each match within their group
    const flowers = ["🌸","🌼","🍀","🌿"];
    const seasons  = ["🌱","☀️","🍂","❄️"];
    if (flowers.includes(a.face.l) && flowers.includes(b.face.l)) return true;
    if (seasons.includes(a.face.l)  && seasons.includes(b.face.l))  return true;
    return false;
}

function isFree(tile) {
    if (tile.removed) return false;

    // Blocked above?
    const above = tiles.filter(t =>
        !t.removed &&
        t.layer === tile.layer + 1 &&
        Math.abs(t.col - tile.col) <= 1 &&
        Math.abs(t.row - tile.row) <= 1
    );
    if (above.length > 0) return false;

    // Blocked on BOTH sides?
    const leftBlocked = tiles.some(t =>
        !t.removed && t.layer === tile.layer &&
        t.col === tile.col - 2 &&
        Math.abs(t.row - tile.row) <= 1
    );
    const rightBlocked = tiles.some(t =>
        !t.removed && t.layer === tile.layer &&
        t.col === tile.col + 2 &&
        Math.abs(t.row - tile.row) <= 1
    );
    return !(leftBlocked && rightBlocked);
}

function updateFreeStates() {
    tiles.forEach(t => {
        if (t.removed) return;
        const free = isFree(t);
        t.el.classList.toggle("mj-blocked", !free);
    });
}

function updateInfo() {
    const remaining = tiles.filter(t => !t.removed).length;
    document.getElementById("tilesLeft").textContent = "Tiles left: " + remaining;
    document.getElementById("mahjongScore").textContent = "Score: " + score;
}

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(function() {
        seconds++;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        document.getElementById("mahjongTimer").textContent =
            "Time: " + m + ":" + (s < 10 ? "0" : "") + s;
    }, 1000);
}

function setMsg(text, color) {
    const el = document.getElementById("mahjongMsg");
    el.textContent = text || "";
    el.style.color = color || "var(--white)";
}

function checkWin() {
    if (tiles.every(t => t.removed)) {
        clearInterval(timerInterval);
        setMsg("🎉 Congratulations — you cleared the board!", "#90ee90");
        return true;
    }
    // Check if any free pairs exist
    const free = tiles.filter(t => !t.removed && isFree(t));
    for (let i = 0; i < free.length; i++) {
        for (let j = i + 1; j < free.length; j++) {
            if (tilesMatch(free[i], free[j])) return false;
        }
    }
    clearInterval(timerInterval);
    setMsg("No more moves — try a new game!", "#ff9999");
    return false;
}

function onTileClick(tile) {
    if (tile.removed || !isFree(tile)) return;
    setMsg("");

    if (!selected) {
        selected = tile;
        tile.el.classList.add("mj-selected");
        return;
    }

    if (selected === tile) {
        tile.el.classList.remove("mj-selected");
        selected = null;
        return;
    }

    if (tilesMatch(selected, tile)) {
        // Remove pair
        const pair = [selected, tile];
        pair.forEach(t => {
            t.el.classList.remove("mj-selected");
            t.el.classList.add("mj-removing");
            setTimeout(() => { t.el.style.display = "none"; }, 280);
            t.removed = true;
        });
        history.push(pair);
        score += 10;
        selected = null;
        setTimeout(() => {
            updateFreeStates();
            updateInfo();
            checkWin();
        }, 300);
    } else {
        // Wrong match — flash and deselect old
        selected.el.classList.remove("mj-selected");
        selected = tile;
        tile.el.classList.add("mj-selected");
    }
}

function showHint() {
    const free = tiles.filter(t => !t.removed && isFree(t));
    for (let i = 0; i < free.length; i++) {
        for (let j = i + 1; j < free.length; j++) {
            if (tilesMatch(free[i], free[j])) {
                [free[i], free[j]].forEach(t => {
                    t.el.classList.add("mj-hint");
                    setTimeout(() => t.el.classList.remove("mj-hint"), 1300);
                });
                setMsg("💡 Hint: a matching pair has been highlighted!", "var(--gold)");
                return;
            }
        }
    }
    setMsg("No matching pairs available.", "#ff9999");
}

function undoMove() {
    if (history.length === 0) { setMsg("Nothing to undo.", "rgba(255,255,255,0.7)"); return; }
    const pair = history.pop();
    pair.forEach(t => {
        t.removed = false;
        t.el.style.display = "";
        t.el.classList.remove("mj-removing");
    });
    score = Math.max(0, score - 10);
    if (selected) { selected.el.classList.remove("mj-selected"); selected = null; }
    updateFreeStates();
    updateInfo();
    setMsg("Move undone.", "rgba(255,255,255,0.8)");
}

function newGame() {
    clearInterval(timerInterval);
    selected = null;
    history = [];
    score = 0;
    setMsg("");

    const layout = buildLayout();
    const faces  = makeTileSet();
    const wrap = document.getElementById("mahjongBoardWrap");
    wrap.innerHTML = "";

    const inner = document.createElement("div");
    inner.id = "mahjongBoard";

    const TW = 50, TH = 62, OFFSET = 5;
    const cols = 17, rows = 9;
    const boardW = cols * TW + 20;
    const boardH = rows * TH + 20;
    inner.style.position = "relative";
    inner.style.width    = boardW + "px";
    inner.style.height   = boardH + "px";
    inner.style.display  = "inline-block";
    wrap.appendChild(inner);

    const board = inner;

    tiles = layout.map((pos, i) => {
        const face = faces[i];
        const el = document.createElement("div");
        el.className = "mj-tile";
        el.textContent = face.l;
        el.style.color = face.c;

        const x = (pos.col + 1) * (TW / 2) - OFFSET * pos.layer;
        const y = (pos.row + 0.5) * (TH / 2) - OFFSET * pos.layer;
        el.style.left   = x + "px";
        el.style.top    = y + "px";
        el.style.zIndex = pos.layer * 20 + pos.col;

        board.appendChild(el);

        const tile = { id: i, col: pos.col, row: pos.row, layer: pos.layer,
                       face: face, el, removed: false };
        el.addEventListener("click", () => onTileClick(tile));
        return tile;
    });

    updateFreeStates();
    updateInfo();
    startTimer();
}

document.getElementById("mahjongNew").addEventListener("click", newGame);
document.getElementById("mahjongHint").addEventListener("click", showHint);
document.getElementById("mahjongUndo").addEventListener("click", undoMove);

// Start on load
newGame();
