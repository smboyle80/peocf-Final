"use strict";

/* ================================================
   CHESS — Full two-player with legal move
   highlighting, check/checkmate/stalemate detection,
   castling, en passant, and pawn promotion.
   ================================================ */

const PIECES = {
    wK:"♔", wQ:"♕", wR:"♖", wB:"♗", wN:"♘", wP:"♙",
    bK:"♚", bQ:"♛", bR:"♜", bB:"♝", bN:"♞", bP:"♟"
};

// Initial board — array of 64, index 0 = a8 (top-left), 63 = h1 (bottom-right)
function startingBoard() {
    return [
        "bR","bN","bB","bQ","bK","bB","bN","bR",
        "bP","bP","bP","bP","bP","bP","bP","bP",
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        "wP","wP","wP","wP","wP","wP","wP","wP",
        "wR","wN","wB","wQ","wK","wB","wN","wR"
    ];
}

let board, turn, selected, legalMovesCache;
let enPassantTarget;       // index of square that can be captured en passant
let castlingRights;        // {wK, wQ, bK, bQ}
let history;               // for undo
let capturedByWhite, capturedByBlack;
let gameOver;

function color(piece) { return piece ? piece[0] : null; }
function type(piece)  { return piece ? piece[1] : null; }
function opponent(c)  { return c === "w" ? "b" : "w"; }
function idx(r, c)    { return r * 8 + c; }
function row(i)       { return Math.floor(i / 8); }
function col(i)       { return i % 8; }

/* ---- Raw move generation (ignores check) ---- */
function rawMoves(i, b, ep, cr) {
    const p = b[i]; if (!p) return [];
    const c = color(p), t = type(p), r = row(i), co = col(i);
    const moves = [];
    const opp = opponent(c);

    function push(ti) {
        if (ti < 0 || ti > 63) return;
        if (color(b[ti]) !== c) moves.push(ti);
    }
    function slide(dr, dc) {
        let nr = r + dr, nc = co + dc;
        while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            const ti = idx(nr, nc);
            if (b[ti]) { if (color(b[ti]) === opp) moves.push(ti); break; }
            moves.push(ti); nr += dr; nc += dc;
        }
    }
    function step(dr, dc) {
        const nr = r + dr, nc = co + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) push(idx(nr, nc));
    }

    if (t === "R") { [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => slide(dr,dc)); }
    if (t === "B") { [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => slide(dr,dc)); }
    if (t === "Q") { [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => slide(dr,dc)); }
    if (t === "N") { [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dr,dc]) => step(dr,dc)); }
    if (t === "K") { [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => step(dr,dc)); }

    if (t === "P") {
        const dir = c === "w" ? -1 : 1;
        const startRow = c === "w" ? 6 : 1;
        const fwd = idx(r + dir, co);
        if (!b[fwd]) {
            moves.push(fwd);
            if (r === startRow && !b[idx(r + 2*dir, co)]) moves.push(idx(r + 2*dir, co));
        }
        [-1, 1].forEach(dc => {
            const nc = co + dc;
            if (nc < 0 || nc > 7) return;
            const ti = idx(r + dir, nc);
            if (color(b[ti]) === opp) moves.push(ti);
            if (ti === ep) moves.push(ti); // en passant
        });
    }
    return moves;
}

function kingIndex(c, b) { return b.findIndex(p => p === c + "K"); }

function isAttacked(i, byColor, b) {
    return b.some((p, from) => p && color(p) === byColor && rawMoves(from, b, -1, {}).includes(i));
}

function inCheck(c, b) { return isAttacked(kingIndex(c, b), opponent(c), b); }

/* ---- Legal moves (filter out moves leaving own king in check) ---- */
function legalMoves(i, b, ep, cr) {
    const c = color(b[i]);
    const raw = rawMoves(i, b, ep, cr);
    const legal = raw.filter(ti => {
        const nb = [...b]; nb[ti] = b[i]; nb[i] = null;
        // En passant captured pawn removal
        if (type(b[i]) === "P" && ti === ep) {
            const capRow = row(i); nb[idx(capRow, col(ti))] = null;
        }
        return !inCheck(c, nb);
    });

    // Castling
    if (type(b[i]) === "K" && !inCheck(c, b)) {
        const rank = c === "w" ? 7 : 0;
        if (cr[c + "K"] && !b[idx(rank,5)] && !b[idx(rank,6)] &&
            !isAttacked(idx(rank,4), opponent(c), b) &&
            !isAttacked(idx(rank,5), opponent(c), b) &&
            !isAttacked(idx(rank,6), opponent(c), b)) {
            legal.push(idx(rank, 6));
        }
        if (cr[c + "Q"] && !b[idx(rank,3)] && !b[idx(rank,2)] && !b[idx(rank,1)] &&
            !isAttacked(idx(rank,4), opponent(c), b) &&
            !isAttacked(idx(rank,3), opponent(c), b) &&
            !isAttacked(idx(rank,2), opponent(c), b)) {
            legal.push(idx(rank, 2));
        }
    }
    return legal;
}

function allLegalMoves(c, b, ep, cr) {
    const moves = [];
    b.forEach((p, i) => { if (color(p) === c) legalMoves(i, b, ep, cr).forEach(ti => moves.push([i, ti])); });
    return moves;
}

/* ---- Apply move ---- */
function applyMove(from, to, b, ep, cr, promoType) {
    const nb  = [...b];
    const ncr = {...cr};
    let nep   = -1;
    let captured = null;

    const p = nb[from];
    const c = color(p);
    const t = type(p);

    // En passant capture
    if (t === "P" && to === ep) {
        const capIdx = idx(row(from), col(to));
        captured = nb[capIdx];
        nb[capIdx] = null;
    } else {
        captured = nb[to];
    }

    nb[to] = nb[from]; nb[from] = null;

    // Pawn double push — set en passant target
    if (t === "P" && Math.abs(row(to) - row(from)) === 2) {
        nep = idx((row(from) + row(to)) / 2, col(from));
    }

    // Castling rook move
    if (t === "K") {
        const rank = c === "w" ? 7 : 0;
        if (to === idx(rank, 6)) { nb[idx(rank,5)] = nb[idx(rank,7)]; nb[idx(rank,7)] = null; }
        if (to === idx(rank, 2)) { nb[idx(rank,3)] = nb[idx(rank,0)]; nb[idx(rank,0)] = null; }
        ncr[c + "K"] = false; ncr[c + "Q"] = false;
    }
    if (t === "R") {
        if (from === idx(7,0)) ncr["wQ"] = false;
        if (from === idx(7,7)) ncr["wK"] = false;
        if (from === idx(0,0)) ncr["bQ"] = false;
        if (from === idx(0,7)) ncr["bK"] = false;
    }

    // Pawn promotion
    if (t === "P" && (row(to) === 0 || row(to) === 7)) {
        nb[to] = c + (promoType || "Q");
    }

    return { board: nb, ep: nep, cr: ncr, captured };
}

/* ---- Render ---- */
function render() {
    const boardEl = document.getElementById("chessBoard");
    boardEl.innerHTML = "";

    const lastFrom = history.length ? history[history.length-1].from : -1;
    const lastTo   = history.length ? history[history.length-1].to   : -1;

    for (let i = 0; i < 64; i++) {
        const sq = document.createElement("div");
        const r = row(i), c = col(i);
        sq.className = "chess-sq " + ((r + c) % 2 === 0 ? "light" : "dark");
        sq.dataset.idx = i;

        // Labels
        if (c === 0) { const l = document.createElement("span"); l.className="sq-label rank"; l.textContent = 8 - r; sq.appendChild(l); }
        if (r === 7) { const l = document.createElement("span"); l.className="sq-label file"; l.textContent = "abcdefgh"[c]; sq.appendChild(l); }

        // Highlights
        if (i === lastFrom || i === lastTo) sq.classList.add("last-move");
        if (selected === i) sq.classList.add("selected");
        if (legalMovesCache && legalMovesCache.includes(i)) {
            sq.classList.add(board[i] && color(board[i]) !== turn ? "legal-capture" : "legal-move");
        }

        // Check highlight
        if (!gameOver && inCheck(turn, board) && board[i] === turn + "K") sq.classList.add("in-check");

        // Piece
        if (board[i]) {
            const span = document.createElement("span");
            span.textContent = PIECES[board[i]];
            sq.appendChild(span);
        }

        sq.addEventListener("click", () => onSquareClick(i));
        boardEl.appendChild(sq);
    }

    // Turn / status
    document.getElementById("chessTurn").textContent = turn === "w" ? "White's Turn" : "Black's Turn";

    // Captured
    document.getElementById("capturedByWhite").textContent = capturedByWhite.map(p => PIECES[p]).join(" ");
    document.getElementById("capturedByBlack").textContent = capturedByBlack.map(p => PIECES[p]).join(" ");
}

function setStatus(msg) { document.getElementById("chessStatus").textContent = msg; }

/* ---- Click handler ---- */
function onSquareClick(i) {
    if (gameOver) return;

    if (selected !== null && legalMovesCache.includes(i)) {
        // Need promotion?
        if (type(board[selected]) === "P" && (row(i) === 0 || row(i) === 7)) {
            showPromoDialog(selected, i);
            return;
        }
        executeMove(selected, i, null);
        return;
    }

    if (board[i] && color(board[i]) === turn) {
        selected = i;
        legalMovesCache = legalMoves(i, board, enPassantTarget, castlingRights);
    } else {
        selected = null;
        legalMovesCache = [];
    }
    render();
}

function executeMove(from, to, promoType) {
    const result = applyMove(from, to, board, enPassantTarget, castlingRights, promoType);

    history.push({ from, to, board: [...board], ep: enPassantTarget, cr: {...castlingRights},
                   capW: [...capturedByWhite], capB: [...capturedByBlack] });

    if (result.captured) {
        if (turn === "w") capturedByWhite.push(result.captured);
        else              capturedByBlack.push(result.captured);
    }

    board          = result.board;
    enPassantTarget = result.ep;
    castlingRights = result.cr;
    turn           = opponent(turn);
    selected       = null;
    legalMovesCache = [];

    // Check game state
    const moves = allLegalMoves(turn, board, enPassantTarget, castlingRights);
    if (moves.length === 0) {
        gameOver = true;
        if (inCheck(turn, board)) {
            setStatus((turn === "w" ? "Black" : "White") + " wins by checkmate! 🎉");
        } else {
            setStatus("Stalemate — it's a draw!");
        }
    } else if (inCheck(turn, board)) {
        setStatus("Check!");
    } else {
        setStatus("");
    }

    render();
}

/* ---- Pawn promotion dialog ---- */
function showPromoDialog(from, to) {
    const existing = document.getElementById("promoDialog");
    if (existing) existing.remove();

    const pieces = turn === "w"
        ? [{k:"Q",e:"♕"},{k:"R",e:"♖"},{k:"B",e:"♗"},{k:"N",e:"♘"}]
        : [{k:"Q",e:"♛"},{k:"R",e:"♜"},{k:"B",e:"♝"},{k:"N",e:"♞"}];

    const dialog = document.createElement("div");
    dialog.id = "promoDialog";
    dialog.innerHTML = `<div class="promo-box">
        <h3>Promote Pawn</h3>
        <div class="promo-options">
            ${pieces.map(p => `<button class="promo-btn" data-piece="${p.k}">${p.e}</button>`).join("")}
        </div></div>`;
    document.body.appendChild(dialog);

    dialog.querySelectorAll(".promo-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.remove();
            executeMove(from, to, btn.dataset.piece);
        });
    });
}

/* ---- Undo ---- */
document.getElementById("chessUndo").addEventListener("click", function() {
    if (!history.length) return;
    const prev = history.pop();
    board            = prev.board;
    enPassantTarget  = prev.ep;
    castlingRights   = prev.cr;
    capturedByWhite  = prev.capW;
    capturedByBlack  = prev.capB;
    turn             = opponent(turn);
    selected         = null;
    legalMovesCache  = [];
    gameOver         = false;
    setStatus("");
    render();
});

/* ---- New game ---- */
function newGame() {
    board            = startingBoard();
    turn             = "w";
    selected         = null;
    legalMovesCache  = [];
    enPassantTarget  = -1;
    castlingRights   = { wK:true, wQ:true, bK:true, bQ:true };
    history          = [];
    capturedByWhite  = [];
    capturedByBlack  = [];
    gameOver         = false;
    setStatus("");
    render();
}

document.getElementById("chessReset").addEventListener("click", newGame);

newGame();
