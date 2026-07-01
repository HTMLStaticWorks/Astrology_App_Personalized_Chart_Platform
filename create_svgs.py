import os

images_dir = r"d:\projects\Astrology App & Personalized Chart Platform\assets\images"

synastry_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(124, 58, 237, 0.4)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)" />
    </radialGradient>
  </defs>
  <rect width="500" height="500" fill="transparent" />
  <circle cx="250" cy="250" r="220" fill="url(#glow)" />
  <circle cx="250" cy="250" r="200" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10 5" opacity="0.6" />
  <circle cx="250" cy="250" r="180" fill="none" stroke="#6366f1" stroke-width="1" opacity="0.8" />
  <circle cx="250" cy="250" r="160" fill="none" stroke="#f59e0b" stroke-width="1" opacity="0.4" />
  
  <g stroke="#8b5cf6" stroke-width="1.5" opacity="0.7">
    <line x1="50" y1="250" x2="450" y2="250" />
    <line x1="250" y1="50" x2="250" y2="450" />
    <line x1="108" y1="108" x2="392" y2="392" />
    <line x1="108" y1="392" x2="392" y2="108" />
  </g>
  
  <!-- Outer planets -->
  <g fill="#f59e0b">
    <circle cx="250" cy="50" r="8" />
    <circle cx="400" cy="110" r="5" />
    <circle cx="450" cy="250" r="6" />
    <circle cx="390" cy="390" r="9" />
    <circle cx="250" cy="450" r="7" />
    <circle cx="110" cy="400" r="5" />
    <circle cx="50" cy="250" r="6" />
    <circle cx="100" cy="100" r="8" />
  </g>
  
  <path d="M 250 50 Q 450 250 250 450 Q 50 250 250 50" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.5" />
</svg>"""

precision_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0)" />
    </radialGradient>
  </defs>
  <rect width="500" height="500" fill="transparent" />
  <circle cx="250" cy="250" r="230" fill="url(#glow2)" />
  <circle cx="250" cy="250" r="210" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.8" />
  <circle cx="250" cy="250" r="170" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.6" />
  
  <g stroke="#10b981" stroke-width="1" opacity="0.5">
    <!-- Grid lines -->
    <line x1="20" y1="20" x2="480" y2="480" />
    <line x1="20" y1="480" x2="480" y2="20" />
    <line x1="250" y1="20" x2="250" y2="480" />
    <line x1="20" y1="250" x2="480" y2="250" />
  </g>
  
  <!-- Rings and notches -->
  <g stroke="#3b82f6" stroke-width="2" opacity="0.7">
    <path d="M 250 40 A 210 210 0 0 1 460 250" fill="none" />
    <path d="M 250 460 A 210 210 0 0 1 40 250" fill="none" />
  </g>
  
  <g fill="#f59e0b">
    <polygon points="250,230 270,270 230,270" />
    <polygon points="250,20 260,40 240,40" />
    <polygon points="250,480 260,460 240,460" />
    <polygon points="20,250 40,240 40,260" />
    <polygon points="480,250 460,240 460,260" />
  </g>
</svg>"""

nebula_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="nebula1" cx="30%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(124, 58, 237, 0.6)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.1)" />
    </radialGradient>
    <radialGradient id="nebula2" cx="70%" cy="70%" r="60%">
      <stop offset="0%" stop-color="rgba(245, 158, 11, 0.5)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.1)" />
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="#0f172a" />
  <rect width="800" height="600" fill="url(#nebula1)" />
  <rect width="800" height="600" fill="url(#nebula2)" />
  
  <!-- Stars -->
  <g fill="#ffffff" opacity="0.8">
    <circle cx="100" cy="150" r="2" />
    <circle cx="200" cy="80" r="1.5" />
    <circle cx="350" cy="250" r="2.5" />
    <circle cx="500" cy="120" r="1" />
    <circle cx="700" cy="200" r="2" />
    <circle cx="650" cy="400" r="1.5" />
    <circle cx="450" cy="450" r="2" />
    <circle cx="250" cy="500" r="1" />
    <circle cx="150" cy="350" r="2.5" />
  </g>
  
  <!-- Constellation Lines -->
  <g stroke="#ffffff" stroke-width="0.5" opacity="0.3">
    <line x1="100" y1="150" x2="200" y2="80" />
    <line x1="200" y1="80" x2="350" y2="250" />
    <line x1="350" y1="250" x2="150" y2="350" />
    <line x1="700" y1="200" x2="500" y2="120" />
    <line x1="500" y1="120" x2="650" y2="400" />
  </g>
</svg>"""

with open(os.path.join(images_dir, "synastry_chart.svg"), "w") as f:
    f.write(synastry_svg)
    
with open(os.path.join(images_dir, "precision_chart.svg"), "w") as f:
    f.write(precision_svg)

with open(os.path.join(images_dir, "nebula_bg.svg"), "w") as f:
    f.write(nebula_svg)

print("SVG files created successfully.")
