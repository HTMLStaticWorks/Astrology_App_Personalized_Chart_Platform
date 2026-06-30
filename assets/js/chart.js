// Aura Astrology - Vector Birth Chart SVG Generator

const zodiacData = [
  { name: 'Aries', symbol: '♈', color: '#EF4444', desc: 'Aries represents action, initiation, and passion.' },
  { name: 'Taurus', symbol: '♉', color: '#10B981', desc: 'Taurus represents stability, patience, and luxury.' },
  { name: 'Gemini', symbol: '♊', color: '#3B82F6', desc: 'Gemini represents communication, curiosity, and dualism.' },
  { name: 'Cancer', symbol: '♋', color: '#6366F1', desc: 'Cancer represents emotion, protection, and nurturing.' },
  { name: 'Leo', symbol: '♌', color: '#F59E0B', desc: 'Leo represents expression, royalty, and vitality.' },
  { name: 'Virgo', symbol: '♍', color: '#10B981', desc: 'Virgo represents analysis, service, and detail.' },
  { name: 'Libra', symbol: '♎', color: '#3B82F6', desc: 'Libra represents balance, harmony, and relationship.' },
  { name: 'Scorpio', symbol: '♏', color: '#EC4899', desc: 'Scorpio represents intensity, secrets, and transformation.' },
  { name: 'Sagittarius', symbol: '♐', color: '#EF4444', desc: 'Sagittarius represents truth, travel, and optimism.' },
  { name: 'Capricorn', symbol: '♑', color: '#10B981', desc: 'Capricorn represents structure, duty, and achievement.' },
  { name: 'Aquarius', symbol: '♒', color: '#3B82F6', desc: 'Aquarius represents innovation, humanity, and freedom.' },
  { name: 'Pisces', symbol: '♓', color: '#6366F1', desc: 'Pisces represents dreams, intuition, and mysticism.' }
];

const planetsData = [
  { name: 'Sun', symbol: '☉', sign: 'Cancer', degree: 14, house: 10, color: '#F59E0B', interpretation: 'Core identity, vitality, purpose. Your Sun shines bright in the Tenth House of Career and Reputation.' },
  { name: 'Moon', symbol: '☽', sign: 'Scorpio', degree: 2, house: 2, color: '#A78BFA', interpretation: 'Emotional self, subconscious, instinct. Placed in the Second House of values and material security.' },
  { name: 'Mercury', symbol: '☿', sign: 'Cancer', degree: 28, house: 10, color: '#3B82F6', interpretation: 'Communication, logic, mind. In Cancer, you speak with deep intuition and high emotional intelligence.' },
  { name: 'Venus', symbol: '♀', sign: 'Gemini', degree: 4, house: 9, color: '#10B981', interpretation: 'Love, beauty, relationships. Placed in the Ninth House, drawing you to partners from other cultures.' },
  { name: 'Mars', symbol: '♂', sign: 'Leo', degree: 18, house: 11, color: '#EF4444', interpretation: 'Drive, action, ambition. Placed in the Eleventh House, making you a passionate advocate in social groups.' },
  { name: 'Jupiter', symbol: '♃', sign: 'Libra', degree: 9, house: 1, color: '#F59E0B', interpretation: 'Luck, growth, expansion. Situated on your Ascendant, giving you a warm, charming, and lucky presence.' },
  { name: 'Saturn', symbol: '♄', sign: 'Aquarius', degree: 22, house: 5, color: '#6B7280', interpretation: 'Discipline, restriction, karma. Placed in the Fifth House, requiring serious focus in creative pursuits.' },
  { name: 'Ascendant', symbol: 'ASC', sign: 'Libra', degree: 21, house: 1, color: '#F59E0B', interpretation: 'Mask, initial impression. Ascendant in Libra represents beauty, equilibrium, and social grace.' }
];

// Helper to convert polar coordinates to Cartesian
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  // Rotate by 180 to put Ascendant on the left horizon (standard western chart conventions)
  const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// Generate the Birth Chart Wheel Inside a target element
function createBirthChart(containerId, isPartner = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = ''; // Clear container

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 150;
  const midR = 125;
  const innerR = 95;
  const centerR = 40;

  // If partner chart, offset angles to create a variation
  const angleOffset = isPartner ? 75 : 0;

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('class', 'w-full h-auto drop-shadow-xl');

  // Definitions for gradients / filters
  svg.innerHTML = `
    <defs>
      <radialGradient id="chartBgGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#090514" stop-opacity="0.8" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
    </defs>
  `;

  // Draw core chart background
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bg.setAttribute('cx', cx);
  bg.setAttribute('cy', cy);
  bg.setAttribute('r', outerR);
  bg.setAttribute('fill', 'url(#chartBgGrad)');
  bg.setAttribute('stroke', 'rgba(245, 158, 11, 0.25)');
  bg.setAttribute('stroke-width', '1.5');
  svg.appendChild(bg);

  // Outer Zodiac Ring Segments
  for (let i = 0; i < 12; i++) {
    const startAngle = (i * 30) + angleOffset;
    const endAngle = ((i + 1) * 30) + angleOffset;
    const midAngle = startAngle + 15;
    
    // Path for segment
    const p1 = polarToCartesian(cx, cy, outerR, startAngle);
    const p2 = polarToCartesian(cx, cy, outerR, endAngle);
    const p3 = polarToCartesian(cx, cy, midR, endAngle);
    const p4 = polarToCartesian(cx, cy, midR, startAngle);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `
      M ${p1.x} ${p1.y}
      A ${outerR} ${outerR} 0 0 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${midR} ${midR} 0 0 0 ${p4.x} ${p4.y}
      Z
    `);
    path.setAttribute('fill', 'rgba(15, 12, 30, 0.4)');
    path.setAttribute('stroke', 'rgba(245, 158, 11, 0.15)');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('class', 'hover:fill-amber-500/10 cursor-pointer transition-all duration-300');
    
    // Add hover tooltip info
    const zod = zodiacData[i];
    path.addEventListener('mouseenter', (e) => showChartTooltip(e, `${zod.name} (${zod.symbol})`, zod.desc));
    path.addEventListener('mouseleave', hideChartTooltip);
    svg.appendChild(path);

    // Zodiac text symbols
    const textPos = polarToCartesian(cx, cy, (outerR + midR) / 2 + 1, midAngle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', textPos.x);
    text.setAttribute('y', textPos.y + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#F59E0B');
    text.setAttribute('font-size', '13');
    text.setAttribute('class', 'select-none pointer-events-none');
    text.textContent = zod.symbol;
    svg.appendChild(text);
  }

  // Draw inner house circles
  const circleMid = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleMid.setAttribute('cx', cx);
  circleMid.setAttribute('cy', cy);
  circleMid.setAttribute('r', midR);
  circleMid.setAttribute('fill', 'none');
  circleMid.setAttribute('stroke', 'rgba(245, 158, 11, 0.3)');
  circleMid.setAttribute('stroke-width', '1.5');
  svg.appendChild(circleMid);

  const circleInner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleInner.setAttribute('cx', cx);
  circleInner.setAttribute('cy', cy);
  circleInner.setAttribute('r', innerR);
  circleInner.setAttribute('fill', 'none');
  circleInner.setAttribute('stroke', 'rgba(245, 158, 11, 0.15)');
  circleInner.setAttribute('stroke-width', '1');
  svg.appendChild(circleInner);

  const circleCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleCenter.setAttribute('cx', cx);
  circleCenter.setAttribute('cy', cy);
  circleCenter.setAttribute('r', centerR);
  circleCenter.setAttribute('fill', 'rgba(15, 12, 30, 0.8)');
  circleCenter.setAttribute('stroke', 'rgba(245, 158, 11, 0.4)');
  circleCenter.setAttribute('stroke-width', '1.5');
  svg.appendChild(circleCenter);

  // Draw 12 House Dividing lines (Cusp lines)
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) + angleOffset;
    const startPt = polarToCartesian(cx, cy, centerR, angle);
    const endPt = polarToCartesian(cx, cy, midR, angle);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startPt.x);
    line.setAttribute('y1', startPt.y);
    line.setAttribute('x2', endPt.x);
    line.setAttribute('y2', endPt.y);
    
    // Highlight Horizon (ASC/DSC 1st and 7th houses) & Meridian (MC/IC 10th and 4th houses)
    if (i === 0 || i === 6) {
      line.setAttribute('stroke', 'rgba(245, 158, 11, 0.7)');
      line.setAttribute('stroke-width', '2');
    } else if (i === 3 || i === 9) {
      line.setAttribute('stroke', 'rgba(139, 92, 246, 0.7)');
      line.setAttribute('stroke-width', '2');
    } else {
      line.setAttribute('stroke', 'rgba(245, 158, 11, 0.15)');
      line.setAttribute('stroke-width', '1');
    }
    
    svg.appendChild(line);

    // House Number label
    const labelAngle = (i * 30) + 15 + angleOffset;
    const labelPt = polarToCartesian(cx, cy, centerR + 15, labelAngle);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', labelPt.x);
    label.setAttribute('y', labelPt.y + 3);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', 'rgba(245, 158, 11, 0.35)');
    label.setAttribute('font-size', '8');
    label.setAttribute('class', 'select-none pointer-events-none font-sans');
    label.textContent = i + 1;
    svg.appendChild(label);
  }

  // Draw Aspect Lines in center circle (between planets)
  // Let's create aspects statically or randomized to look like standard aspect lines
  const aspectPairings = [
    { p1: 0, p2: 2, color: 'rgba(59, 130, 246, 0.45)', name: 'Sextile' },    // Sun - Mercury
    { p1: 0, p2: 5, color: 'rgba(245, 158, 11, 0.55)', name: 'Trine' },      // Sun - Jupiter
    { p1: 1, p2: 4, color: 'rgba(239, 68, 68, 0.45)', name: 'Square' },      // Moon - Mars
    { p1: 3, p2: 6, color: 'rgba(139, 92, 246, 0.55)', name: 'Opposition' }  // Venus - Saturn
  ];

  aspectPairings.forEach(aspect => {
    // Calculate position angle based on zodiac sign and degrees
    const getAngle = (planet) => {
      const idx = zodiacData.findIndex(z => z.name === planet.sign);
      return (idx * 30) + planet.degree + angleOffset;
    };
    
    const planet1 = planetsData[aspect.p1];
    const planet2 = planetsData[aspect.p2];

    if (planet1 && planet2) {
      const pt1 = polarToCartesian(cx, cy, centerR, getAngle(planet1));
      const pt2 = polarToCartesian(cx, cy, centerR, getAngle(planet2));

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pt1.x);
      line.setAttribute('y1', pt1.y);
      line.setAttribute('x2', pt2.x);
      line.setAttribute('y2', pt2.y);
      line.setAttribute('stroke', aspect.color);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-dasharray', aspect.name === 'Opposition' ? '2,2' : 'none');
      line.setAttribute('class', 'hover:stroke-amber-400 cursor-pointer transition-all');
      
      line.addEventListener('mouseenter', (e) => showChartTooltip(e, `${planet1.name} ${aspect.name} ${planet2.name}`, `A celestial aspect indicating relationship dynamics.`));
      line.addEventListener('mouseleave', hideChartTooltip);

      svg.appendChild(line);
    }
  });

  // Plot Planet Points inside the wheel
  planetsData.forEach((planet, idx) => {
    const zodiacIndex = zodiacData.findIndex(z => z.name === planet.sign);
    const angle = (zodiacIndex * 30) + planet.degree + angleOffset;
    
    // Placed in house segment rings
    const planetPt = polarToCartesian(cx, cy, (midR + innerR) / 2, angle);

    // Planet Node Container
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'cursor-pointer group');

    // Outer aura ring on hover
    const aura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    aura.setAttribute('cx', planetPt.x);
    aura.setAttribute('cy', planetPt.y);
    aura.setAttribute('r', '11');
    aura.setAttribute('fill', 'none');
    aura.setAttribute('stroke', 'rgba(245, 158, 11, 0.4)');
    aura.setAttribute('stroke-width', '1');
    aura.setAttribute('class', 'opacity-0 group-hover:opacity-100 transition-opacity duration-300');
    g.appendChild(aura);

    // Inner plot point dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', planetPt.x);
    dot.setAttribute('cy', planetPt.y);
    dot.setAttribute('r', '2.5');
    dot.setAttribute('fill', planet.color);
    g.appendChild(dot);

    // Planet Glyph symbol label
    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    symbol.setAttribute('x', planetPt.x);
    symbol.setAttribute('y', planetPt.y - 6);
    symbol.setAttribute('text-anchor', 'middle');
    symbol.setAttribute('fill', '#ffffff');
    symbol.setAttribute('font-size', '10');
    symbol.setAttribute('class', 'group-hover:fill-amber-400 select-none font-semibold');
    symbol.textContent = planet.symbol;
    g.appendChild(symbol);

    // Details label
    const deg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    deg.setAttribute('x', planetPt.x);
    deg.setAttribute('y', planetPt.y + 11);
    deg.setAttribute('text-anchor', 'middle');
    deg.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
    deg.setAttribute('font-size', '6');
    deg.setAttribute('class', 'select-none pointer-events-none');
    deg.textContent = `${planet.degree}°`;
    g.appendChild(deg);

    // Add interactivity modal or tooltip
    g.addEventListener('mouseenter', (e) => {
      showChartTooltip(
        e, 
        `${planet.name} in ${planet.sign} ${planet.degree}°`, 
        `House ${planet.house} • ${planet.interpretation}`
      );
    });
    g.addEventListener('mouseleave', hideChartTooltip);
    g.addEventListener('click', () => openPlanetModal(planet));

    svg.appendChild(g);
  });

  container.appendChild(svg);
}

// Interactive Tooltip Elements
let chartTooltip = null;

function showChartTooltip(e, title, desc) {
  if (!chartTooltip) {
    chartTooltip = document.createElement('div');
    chartTooltip.className = 'fixed bg-slate-950/95 text-slate-100 text-xs p-3 rounded border border-amber-500/40 shadow-2xl z-50 pointer-events-none max-w-xs transition-opacity duration-200';
    document.body.appendChild(chartTooltip);
  }
  
  chartTooltip.innerHTML = `
    <h5 class="font-serif text-amber-400 font-bold mb-1 border-b border-indigo-950/30 pb-1">${title}</h5>
    <p class="font-sans font-light leading-relaxed">${desc}</p>
  `;
  
  chartTooltip.style.opacity = '1';
  
  // Position
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  chartTooltip.style.left = `${mouseX + 15}px`;
  chartTooltip.style.top = `${mouseY + 15}px`;
}

function hideChartTooltip() {
  if (chartTooltip) {
    chartTooltip.style.opacity = '0';
  }
}

// Planetary detail modal
function openPlanetModal(planet) {
  let modal = document.getElementById('planet-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'planet-detail-modal';
    modal.className = 'fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden';
    modal.innerHTML = `
      <div class="glass-panel text-slate-100 max-w-md w-full p-6 rounded-lg border border-amber-500/20 relative shadow-2xl">
        <button onclick="closePlanetModal()" class="absolute top-4 end-4 text-slate-400 hover:text-amber-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <span id="modal-planet-glyph" class="text-4xl text-amber-500">☉</span>
          <div>
            <h4 id="modal-planet-title" class="text-2xl font-serif text-slate-100">Sun in Cancer</h4>
            <p id="modal-planet-degree" class="text-xs text-amber-500 font-semibold tracking-wider uppercase">14 Degrees, Tenth House</p>
          </div>
        </div>
        <p id="modal-planet-interpretation" class="text-sm font-light text-slate-300 leading-relaxed mb-6">
          Core identity, vitality, purpose. Your Sun shines bright in the Tenth House of Career and Reputation, suggesting ambition, visibility, and leadership qualities in your chosen occupation.
        </p>
        <div class="flex justify-end">
          <button onclick="closePlanetModal()" class="px-4 py-2 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-500 font-semibold text-xs tracking-wider uppercase rounded transition-all duration-200">
            Close Aspect
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Populate data
  document.getElementById('modal-planet-glyph').textContent = planet.symbol;
  document.getElementById('modal-planet-title').textContent = `${planet.name} in ${planet.sign}`;
  document.getElementById('modal-planet-degree').textContent = `${planet.degree} Degrees, House ${planet.house}`;
  document.getElementById('modal-planet-interpretation').textContent = planet.interpretation;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closePlanetModal() {
  const modal = document.getElementById('planet-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

// Bind to window for HTML accessibility
window.closePlanetModal = closePlanetModal;
window.createBirthChart = createBirthChart;
