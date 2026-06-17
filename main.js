// ── Terminal typewriter ──────────────────────────────────────────────────────

const sequences = [
  {
    cmd: "whoami",
    output: [
      { key: "nombre",   val: "Arturo Nicolás Heredia" },
      { key: "edad",     val: "17 años" },
      { key: "location", val: "Córdoba, AR" },
    ]
  },
  {
    cmd: "cat skills.json",
    output: [
      { key: "languages", val: '["Python", "Flet", "HTML"]' },
      { key: "learning",  val: '"siempre más..."' },
    ]
  },
  {
    cmd: "ls hobbies/",
    output: [
      { key: "→", val: "CS2  Geometry_Dash  Programar  Especialidad" },
    ]
  }
];

let seqIdx = 0;
const cmdEl    = document.getElementById('typing-cmd');
const outEl    = document.getElementById('terminal-output');
const cursorEl = document.getElementById('cursor');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(el, text, speed = 55) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed + Math.random() * 30);
  }
}

async function runSequence() {
  const seq = sequences[seqIdx % sequences.length];
  seqIdx++;

  // Limpiar y escribir el comando
  cmdEl.textContent = '';
  outEl.innerHTML   = '';
  await sleep(500);
  await typeText(cmdEl, seq.cmd);
  await sleep(300);

  // Ocultar cursor mientras aparece el output
  cursorEl.style.display = 'none';

  // Mostrar líneas de output una a una
  for (const row of seq.output) {
    const line = document.createElement('div');
    line.className = 't-line t-out';
    line.innerHTML = `<span style="color:var(--purple)">${row.key}</span>  <span class="val">${row.val}</span>`;
    outEl.appendChild(line);
    await sleep(150);
  }

  await sleep(2200);

  // Borrar el comando letra a letra
  cursorEl.style.display = '';
  while (cmdEl.textContent.length > 0) {
    cmdEl.textContent = cmdEl.textContent.slice(0, -1);
    await sleep(30);
  }

  await sleep(400);
  runSequence(); // loop infinito
}

runSequence();


// ── Scroll fade-in ───────────────────────────────────────────────────────────

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
