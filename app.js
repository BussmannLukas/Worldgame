// ═══════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════
const gameState = {
  foundCountries: new Set(),
  totalCountries: 0,
  totalOnMap: 0, // countries that actually have SVG paths
  gameOver: false,
  timerRunning: false,
  elapsedSeconds: 0, // stopwatch counts up
  timerInterval: null,
  startTime: null,
};

// Region color mapping
const REGION_COLORS = {
  'Europa': '#3b82f6',
  'Asien': '#f59e0b',
  'Afrika': '#22c55e',
  'Amerika': '#ef4444',
  'Ozeanien': '#a855f7',
};

// ═══════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initGame();
});

function initGame() {
  // Count total countries
  gameState.totalCountries = Object.keys(COUNTRIES).length;

  // Count countries that have SVG elements
  gameState.totalOnMap = 0;
  for (const code of Object.keys(COUNTRIES)) {
    const el = document.getElementById(code);
    if (el) gameState.totalOnMap++;
  }

  // Set up input
  const input = document.getElementById('country-input');
  const submitBtn = document.getElementById('submit-btn');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  });

  submitBtn.addEventListener('click', handleGuess);

  // Set up action buttons
  document.getElementById('give-up-btn').addEventListener('click', handleGiveUp);
  document.getElementById('restart-btn').addEventListener('click', handleRestart);
  document.getElementById('restart-btn-overlay').addEventListener('click', handleRestart);

  // Set up timer controls
  document.getElementById('timer-toggle').addEventListener('click', toggleTimer);

  // Set up zoom
  document.getElementById('zoom-in').addEventListener('click', () => zoomMap(1.3));
  document.getElementById('zoom-out').addEventListener('click', () => zoomMap(0.7));
  document.getElementById('zoom-reset').addEventListener('click', resetZoom);

  // Set up pan & zoom on the map
  initMapInteraction();

  // Set up tooltip
  initTooltip();

  // Update UI
  updateProgress();
  updateTimerDisplay();

  // Focus the input
  input.focus();

  // Start timer on first guess
  gameState.startTime = null;
}

// ═══════════════════════════════════════════
// GUESS HANDLING
// ═══════════════════════════════════════════
function handleGuess() {
  if (gameState.gameOver) return;

  const input = document.getElementById('country-input');
  const value = input.value.trim();
  if (!value) return;

  // Start timer on first guess
  if (!gameState.startTime) {
    gameState.startTime = Date.now();
    startTimer();
  }

  const code = lookupCountry(value);

  if (!code) {
    showFeedback('error', `❌ „${value}" ist kein gültiger Ländername.`);
    shakeInput();
    input.select();
    return;
  }

  if (gameState.foundCountries.has(code)) {
    showFeedback('duplicate', `⚠️ ${COUNTRIES[code].displayName} wurde bereits gefunden!`);
    input.select();
    return;
  }

  // Found!
  gameState.foundCountries.add(code);
  const country = COUNTRIES[code];

  showFeedback('success', `✅ ${country.displayName} gefunden!`);
  revealCountry(code);
  addToFoundList(code);
  updateProgress();

  input.value = '';
  input.focus();

  // Check completion
  if (gameState.foundCountries.size === gameState.totalCountries) {
    handleCompletion();
  }
}

// ═══════════════════════════════════════════
// MAP REVEAL
// ═══════════════════════════════════════════
function revealCountry(code) {
  const el = document.getElementById(code);
  if (!el) return; // small island nations without SVG path

  const country = COUNTRIES[code];
  const color = REGION_COLORS[country.region] || '#22c55e';

  if (el.tagName === 'g') {
    el.classList.add('found', 'just-found');
    el.querySelectorAll('path').forEach(p => {
      p.style.fill = color;
    });
  } else {
    el.classList.add('found', 'just-found');
    el.style.fill = color;
  }

  // Remove just-found class after animation
  setTimeout(() => {
    el.classList.remove('just-found');
  }, 1200);
}

// ═══════════════════════════════════════════
// FOUND LIST
// ═══════════════════════════════════════════
function addToFoundList(code) {
  const list = document.getElementById('found-list');
  const country = COUNTRIES[code];
  const num = gameState.foundCountries.size;

  const item = document.createElement('div');
  item.className = 'found-item';
  item.innerHTML = `
    <span class="found-number">#${num}</span>
    <span class="found-name">${country.displayName}</span>
    <span class="found-region">${country.region}</span>
  `;

  // Insert at top
  list.insertBefore(item, list.firstChild);
}

// ═══════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════
function updateProgress() {
  const found = gameState.foundCountries.size;
  const total = gameState.totalCountries;
  const pct = (found / total) * 100;

  document.getElementById('found-count').textContent = found;
  document.getElementById('total-count').textContent = total;
  document.getElementById('progress-count').textContent = `${found} / ${total}`;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('progress-pct').textContent = `${Math.round(pct)}%`;
}

function showFeedback(type, message) {
  const feedback = document.getElementById('feedback');
  feedback.className = `feedback visible ${type}`;
  feedback.textContent = message;

  clearTimeout(feedback._timeout);
  feedback._timeout = setTimeout(() => {
    feedback.classList.remove('visible');
  }, 3000);
}

function shakeInput() {
  const wrapper = document.querySelector('.input-wrapper');
  wrapper.classList.add('shake');
  setTimeout(() => wrapper.classList.remove('shake'), 400);
}

// ═══════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════
function startTimer() {
  if (gameState.timerRunning) return;
  gameState.timerRunning = true;
  document.getElementById('timer-toggle').textContent = '⏸';

  gameState.timerInterval = setInterval(() => {
    gameState.elapsedSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  gameState.timerRunning = false;
  document.getElementById('timer-toggle').textContent = '▶';
  clearInterval(gameState.timerInterval);
}

function toggleTimer() {
  if (gameState.gameOver) return;
  if (gameState.timerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function updateTimerDisplay() {
  const mins = Math.floor(gameState.elapsedSeconds / 60);
  const secs = gameState.elapsedSeconds % 60;
  const display = document.getElementById('timer-display');
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════
// GIVE UP / COMPLETION
// ═══════════════════════════════════════════
function handleGiveUp() {
  if (gameState.gameOver) return;
  gameState.gameOver = true;
  stopTimer();

  const input = document.getElementById('country-input');
  input.disabled = true;

  // Show unfound countries on map
  for (const [code, data] of Object.entries(COUNTRIES)) {
    if (!gameState.foundCountries.has(code)) {
      const el = document.getElementById(code);
      if (el) {
        if (el.tagName === 'g') {
          el.classList.add('missed');
          el.querySelectorAll('path').forEach(p => {
            p.style.fill = '#ef4444';
          });
        } else {
          el.classList.add('missed');
          el.style.fill = '#ef4444';
        }
      }
    }
  }

  // Show overlay with results
  showCompletionOverlay(false);
}

function handleCompletion() {
  gameState.gameOver = true;
  stopTimer();

  const input = document.getElementById('country-input');
  input.disabled = true;

  showCompletionOverlay(true);
}

function showCompletionOverlay(isComplete) {
  const overlay = document.getElementById('completion-overlay');
  const found = gameState.foundCountries.size;
  const total = gameState.totalCountries;
  const elapsed = gameState.startTime
    ? Math.floor((Date.now() - gameState.startTime) / 1000)
    : 0;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  document.getElementById('completion-trophy').textContent = isComplete ? '🏆' : '🌍';
  document.getElementById('completion-title').textContent = isComplete
    ? 'Glückwunsch!'
    : 'Aufgegeben';
  document.getElementById('completion-message').textContent = isComplete
    ? 'Du hast alle Länder der Welt gefunden!'
    : `Du hast ${found} von ${total} Ländern gefunden.`;
  document.getElementById('completion-found-value').textContent = `${found}/${total}`;
  document.getElementById('completion-time-value').textContent = `${mins}:${String(secs).padStart(2, '0')}`;
  document.getElementById('completion-pct-value').textContent = `${Math.round((found / total) * 100)}%`;

  setTimeout(() => {
    overlay.classList.add('visible');
  }, 500);
}

function handleRestart() {
  // Reset state
  gameState.foundCountries.clear();
  gameState.gameOver = false;
  gameState.elapsedSeconds = 0;
  gameState.startTime = null;
  stopTimer();

  // Reset UI
  const input = document.getElementById('country-input');
  input.disabled = false;
  input.value = '';
  input.focus();

  document.getElementById('found-list').innerHTML = '';
  document.getElementById('completion-overlay').classList.remove('visible');
  document.getElementById('feedback').classList.remove('visible');

  // Reset map
  for (const code of Object.keys(COUNTRIES)) {
    const el = document.getElementById(code);
    if (el) {
      el.classList.remove('found', 'just-found', 'missed');
      if (el.tagName === 'g') {
        el.querySelectorAll('path').forEach(p => {
          p.style.fill = '';
        });
      } else {
        el.style.fill = '';
      }
    }
  }

  updateProgress();
  updateTimerDisplay();
  resetZoom();
}

// ═══════════════════════════════════════════
// MAP INTERACTION (Pan & Zoom)
// ═══════════════════════════════════════════
let mapTransform = { x: 0, y: 0, scale: 1 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };

function initMapInteraction() {
  const container = document.querySelector('.map-container');
  const svg = container.querySelector('svg');

  // Mouse wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    zoomMap(factor);
  }, { passive: false });

  // Pan
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart = { x: e.clientX - mapTransform.x, y: e.clientY - mapTransform.y };
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    mapTransform.x = e.clientX - dragStart.x;
    mapTransform.y = e.clientY - dragStart.y;
    applyMapTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  // Touch support
  let touchStart = null;
  let initialPinchDist = null;
  let initialScale = 1;

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      touchStart = { x: e.touches[0].clientX - mapTransform.x, y: e.touches[0].clientY - mapTransform.y };
    } else if (e.touches.length === 2) {
      isDragging = false;
      initialPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = mapTransform.scale;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging && touchStart) {
      mapTransform.x = e.touches[0].clientX - touchStart.x;
      mapTransform.y = e.touches[0].clientY - touchStart.y;
      applyMapTransform();
    } else if (e.touches.length === 2 && initialPinchDist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      mapTransform.scale = Math.max(0.5, Math.min(8, initialScale * (dist / initialPinchDist)));
      applyMapTransform();
    }
  }, { passive: false });

  container.addEventListener('touchend', () => {
    isDragging = false;
    touchStart = null;
    initialPinchDist = null;
  });
}

function zoomMap(factor) {
  mapTransform.scale = Math.max(0.5, Math.min(8, mapTransform.scale * factor));
  applyMapTransform();
}

function resetZoom() {
  mapTransform = { x: 0, y: 0, scale: 1 };
  applyMapTransform();
}

function applyMapTransform() {
  const svg = document.querySelector('.map-container svg');
  svg.style.transform = `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`;
  svg.style.transformOrigin = 'center center';
}

// ═══════════════════════════════════════════
// TOOLTIP
// ═══════════════════════════════════════════
function initTooltip() {
  const tooltip = document.getElementById('map-tooltip');
  const mapContainer = document.querySelector('.map-container');

  mapContainer.addEventListener('mousemove', (e) => {
    const target = e.target.closest('[id]');
    if (!target) {
      tooltip.classList.remove('visible');
      return;
    }

    const code = target.id;
    const country = COUNTRIES[code];

    // Only show tooltip for found countries
    if (country && gameState.foundCountries.has(code)) {
      tooltip.textContent = country.displayName;
      tooltip.style.left = e.clientX + 16 + 'px';
      tooltip.style.top = e.clientY - 10 + 'px';
      tooltip.classList.add('visible');
    } else {
      tooltip.classList.remove('visible');
    }
  });

  mapContainer.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
}
