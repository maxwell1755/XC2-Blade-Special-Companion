const PORTRAIT_SRC = 'assets/mnu_face.0.png';
const PORTRAIT_SIZE = 70; // Adjust if your squares are a different size

// Called once the page loads
window.addEventListener('DOMContentLoaded', () => {
  loadPortraits();
});

// Load JSON and render each portrait
async function loadPortraits() {
  try {
    const res = await fetch('data/portraitMap.json');
    const map = await res.json();

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '12px';
    container.style.padding = '20px';

    for (const name in map) {
      if (!name) continue; // Skip empty names
      const el = createPortraitDiv(name, map[name]);
      container.appendChild(el);
    }

    document.body.appendChild(container);
  } catch (err) {
    console.error('Failed to load portrait map:', err);
  }
}

// Creates a <div> with background-cropped portrait
function createPortraitDiv(name, [col, row]) {
  const div = document.createElement('div');
  div.className = 'portrait';
  div.title = name;

  div.style.width = `${PORTRAIT_SIZE}px`;
  div.style.height = `${PORTRAIT_SIZE}px`;
  div.style.backgroundImage = `url(${PORTRAIT_SRC})`;
  div.style.backgroundPosition = `-${col * PORTRAIT_SIZE}px -${row * PORTRAIT_SIZE}px`;
  div.style.backgroundSize = `${8 * PORTRAIT_SIZE}px ${12 * PORTRAIT_SIZE}px`; // 8x12 grid
  div.style.border = '1px solid #333';
  div.style.borderRadius = '6px';

  return div;
}
