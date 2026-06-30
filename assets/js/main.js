// Aura Astrology Platform - Core JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  injectComponents();
  generateStarfields();
  initScrollReveal();
});

// 1. Theme (Dark/Light) Management
function initTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
  updateThemeUI();
}

function toggleTheme() {
  if (document.documentElement.classList.contains('light')) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
  updateThemeUI();
}

function updateThemeUI() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const isLight = document.documentElement.classList.contains('light');
  
  themeToggles.forEach(toggle => {
    if (isLight) {
      toggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    } else {
      toggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      `;
    }
  });
}

// 2. RTL (Right-To-Left) Management
const translations = {
  en: {
    logo: 'Aura Astro',
    home: 'Home',
    readings: 'Readings',
    pricing: 'Pricing',
    samples: 'Sample Reports',
    compatibility: 'Compatibility',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    ctaPrimary: 'Get My Birth Chart',
    ctaSecondary: 'View Sample Reading',
    copyright: '© 2026 Aura Astrology. All cosmic rights reserved.',
    footerTag: 'Guiding your path through celestial science.'
  },
  ar: {
    logo: 'أورا أسترو',
    home: 'الرئيسية',
    readings: 'القراءات',
    pricing: 'الأسعار',
    samples: 'تقارير عينة',
    compatibility: 'التوافقية',
    about: 'من نحن',
    contact: 'اتصل بنا',
    dashboard: 'لوحة التحكم',
    ctaPrimary: 'احصل على خريطتي',
    ctaSecondary: 'عرض قراءة عينة',
    copyright: '© ٢٠٢٦ أورا أسترو. كل الحقوق الكونية محفوظة.',
    footerTag: 'إرشاد طريقك من خلال العلوم السماوية.'
  }
};

function initRTL() {
  const isRtl = localStorage.getItem('rtl') === 'true';
  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.classList.add('rtl-active');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.classList.remove('rtl-active');
  }
  updateRTLUI();
}

function toggleRTL() {
  const currentRtl = document.documentElement.getAttribute('dir') === 'rtl';
  if (currentRtl) {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.classList.remove('rtl-active');
    localStorage.setItem('rtl', 'false');
  } else {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.classList.add('rtl-active');
    localStorage.setItem('rtl', 'true');
  }
  updateRTLUI();
  translateLayout();
}

function updateRTLUI() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  rtlToggles.forEach(toggle => {
    toggle.textContent = isRtl ? 'EN' : 'عربي';
  });
}

function translateLayout() {
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  const lang = isRtl ? 'ar' : 'en';
  const t = translations[lang];

  // Dynamic navbar translates
  document.querySelectorAll('[data-t-logo]').forEach(el => el.textContent = t.logo);
  document.querySelectorAll('[data-t-home]').forEach(el => el.textContent = t.home);
  document.querySelectorAll('[data-t-readings]').forEach(el => el.textContent = t.readings);
  document.querySelectorAll('[data-t-pricing]').forEach(el => el.textContent = t.pricing);
  document.querySelectorAll('[data-t-samples]').forEach(el => el.textContent = t.samples);
  document.querySelectorAll('[data-t-compatibility]').forEach(el => el.textContent = t.compatibility);
  document.querySelectorAll('[data-t-about]').forEach(el => el.textContent = t.about);
  document.querySelectorAll('[data-t-contact]').forEach(el => el.textContent = t.contact);
  document.querySelectorAll('[data-t-dashboard]').forEach(el => el.textContent = t.dashboard);
  document.querySelectorAll('[data-t-cta-primary]').forEach(el => el.textContent = t.ctaPrimary);
  document.querySelectorAll('[data-t-cta-secondary]').forEach(el => el.textContent = t.ctaSecondary);
  document.querySelectorAll('[data-t-footer-tag]').forEach(el => el.textContent = t.footerTag);
  document.querySelectorAll('[data-t-copyright]').forEach(el => el.textContent = t.copyright);
}

// 3. Common Component Injection
function injectComponents() {
  const headerRoot = document.getElementById('header-root');
  const footerRoot = document.getElementById('footer-root');
  
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  const lang = isRtl ? 'ar' : 'en';
  const t = translations[lang];
  
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  if (headerRoot) {
    headerRoot.innerHTML = `
      <nav class="fixed top-0 start-0 w-full z-50 border-b border-indigo-950/20 bg-white/80 dark:bg-slate-950/70 backdrop-blur-md transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Brand Logo -->
            <div class="flex items-center">
              <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse text-amber-500 font-bold text-xl tracking-wider whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span data-t-logo class="font-serif text-slate-900 dark:text-slate-100 whitespace-nowrap">${t.logo}</span>
              </a>
            </div>

            <!-- Navigation Links -->
            <div class="hidden lg:flex items-center space-x-3 rtl:space-x-reverse text-sm font-medium">
              <a href="index.html" data-t-home class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'index.html' ? 'text-amber-500 font-semibold' : ''}">${t.home}</a>
              <a href="pricing.html" data-t-pricing class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'pricing.html' ? 'text-amber-500 font-semibold' : ''}">${t.pricing}</a>
              <a href="sample-reports.html" data-t-samples class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'sample-reports.html' ? 'text-amber-500 font-semibold' : ''}">${t.samples}</a>
              <a href="compatibility.html" data-t-compatibility class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'compatibility.html' ? 'text-amber-500 font-semibold' : ''}">${t.compatibility}</a>
              <a href="about.html" data-t-about class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'about.html' ? 'text-amber-500 font-semibold' : ''}">${t.about}</a>
              <a href="contact.html" data-t-contact class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'contact.html' ? 'text-amber-500 font-semibold' : ''}">${t.contact}</a>
              <a href="dashboard.html" data-t-dashboard class="text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'dashboard.html' ? 'text-amber-500 font-semibold' : ''}">${t.dashboard}</a>
            </div>

            <!-- Right-Side Utilities & CTAs -->
            <div class="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
              <!-- Secondary CTA -->
              <a href="sample-reports.html" data-t-cta-secondary class="h-10 flex items-center justify-center px-4 border border-amber-500/30 hover:border-amber-500/80 hover:bg-amber-500/5 text-amber-400 font-semibold text-xs tracking-wider uppercase rounded transition-all duration-300 whitespace-nowrap flex-shrink-0">${t.ctaSecondary}</a>
              
              <!-- Primary CTA -->
              <a href="signup.html" data-t-cta-primary class="h-10 flex items-center justify-center px-4 bg-gradient-to-r from-violet-700 to-indigo-800 hover:from-violet-600 hover:to-indigo-700 text-white font-semibold text-xs tracking-wider uppercase rounded shadow-lg shadow-indigo-900/30 transition-all duration-300 gold-hover-ring whitespace-nowrap flex-shrink-0">${t.ctaPrimary}</a>
              
              <!-- Divider -->
              <div class="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>

              <!-- RTL Toggle -->
              <button onclick="toggleRTL()" class="rtl-toggle h-10 w-12 flex items-center justify-center border border-slate-700 hover:border-amber-500 rounded text-xs text-slate-700 dark:text-slate-300 hover:text-amber-400 font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0">
                ${isRtl ? 'EN' : 'عربي'}
              </button>

              <!-- Dark/Light Theme Toggle -->
              <button onclick="toggleTheme()" class="theme-toggle w-10 h-10 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all duration-200 flex-shrink-0">
                <!-- Inner HTML is dynamically generated by updateThemeUI() -->
              </button>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <div class="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">
              <button onclick="toggleTheme()" class="theme-toggle p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-900/30">
                <!-- Dynamic Theme Icon -->
              </button>
              <button onclick="toggleRTL()" class="rtl-toggle text-xs px-2 py-1 border border-slate-700 rounded text-slate-700 dark:text-slate-300">
                ${isRtl ? 'EN' : 'عربي'}
              </button>
              <button onclick="toggleMobileNav()" class="p-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 focus:outline-none">
                <svg id="mobile-menu-burger" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <svg id="mobile-menu-close" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Container -->
        <div id="mobile-menu" class="hidden lg:hidden border-t border-indigo-950/20 bg-white dark:bg-slate-950/95 px-4 pt-2 pb-6 space-y-3 flex flex-col text-base font-medium shadow-2xl transition-all duration-300">
          <a href="index.html" data-t-home class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.home}</a>
          <a href="pricing.html" data-t-pricing class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.pricing}</a>
          <a href="sample-reports.html" data-t-samples class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.samples}</a>
          <a href="compatibility.html" data-t-compatibility class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.compatibility}</a>
          <a href="about.html" data-t-about class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.about}</a>
          <a href="contact.html" data-t-contact class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.contact}</a>
          <a href="dashboard.html" data-t-dashboard class="text-slate-600 dark:text-slate-300 py-2 border-b border-slate-800/40">${t.dashboard}</a>
          
          <div class="flex flex-col gap-2 pt-2">
            <a href="sample-reports.html" data-t-cta-secondary class="w-full text-center px-4 py-2 border border-amber-500/30 text-amber-400 font-semibold text-sm rounded transition-all">${t.ctaSecondary}</a>
            <a href="signup.html" data-t-cta-primary class="w-full text-center px-4 py-2 bg-gradient-to-r from-violet-700 to-indigo-800 text-white font-semibold text-sm rounded shadow-lg transition-all">${t.ctaPrimary}</a>
          </div>
        </div>
      </nav>
    `;
    updateThemeUI();
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="bg-slate-950 border-t border-indigo-950/30 text-slate-400 py-16 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <!-- Column 1: Brand -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2 rtl:space-x-reverse text-amber-500 font-bold text-lg tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span data-t-logo class="font-serif text-slate-100">${t.logo}</span>
            </div>
            <p data-t-footer-tag class="text-sm font-light text-slate-500">${t.footerTag}</p>
          </div>

          <!-- Column 2: Navigation Links -->
          <div class="space-y-3">
            <h4 class="font-serif text-amber-500 text-sm tracking-widest uppercase font-semibold">Explore</h4>
            <ul class="space-y-2 text-sm flex flex-col">
              <li><a href="index.html" class="hover:text-amber-500 transition-colors">${t.home}</a></li>
              <li><a href="readings.html" class="hover:text-amber-500 transition-colors">${t.readings}</a></li>
              <li><a href="pricing.html" class="hover:text-amber-500 transition-colors">${t.pricing}</a></li>
              <li><a href="sample-reports.html" class="hover:text-amber-500 transition-colors">${t.samples}</a></li>
            </ul>
          </div>

          <!-- Column 3: Features & Trust -->
          <div class="space-y-3">
            <h4 class="font-serif text-amber-500 text-sm tracking-widest uppercase font-semibold">Trust & Science</h4>
            <ul class="space-y-2 text-sm flex flex-col">
              <li><a href="compatibility.html" class="hover:text-amber-500 transition-colors">${t.compatibility}</a></li>
              <li><a href="about.html" class="hover:text-amber-500 transition-colors">${t.about}</a></li>
              <li><a href="contact.html" class="hover:text-amber-500 transition-colors">${t.contact}</a></li>
              <li><a href="dashboard.html" class="hover:text-amber-500 transition-colors">${t.dashboard}</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div class="space-y-3">
            <h4 class="font-serif text-amber-500 text-sm tracking-widest uppercase font-semibold">Cosmic Updates</h4>
            <p class="text-xs text-slate-500 font-light">Subscribe to receive major lunar forecasts and transit alignments directly in your inbox.</p>
            <form onsubmit="handleSubscribe(event)" class="flex mt-2">
              <input type="email" placeholder="Celestial email..." class="bg-indigo-950/20 border border-slate-800 text-slate-300 text-xs rounded-l px-3 py-2 focus:outline-none focus:border-amber-500 w-full" required />
              <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 rounded-r text-xs transition-colors">Join</button>
            </form>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          <p data-t-copyright>${t.copyright}</p>
        </div>
      </footer>
    `;
  }
  
  // Make sure layout matches standard active states on startup
  translateLayout();
}

// 4. Mobile Menu Toggling
function toggleMobileNav() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.getElementById('mobile-menu-burger');
  const close = document.getElementById('mobile-menu-close');
  
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    burger.classList.add('hidden');
    close.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
    burger.classList.remove('hidden');
    close.classList.add('hidden');
  }
}

// 5. Twinkling Starfield Generator
function generateStarfields() {
  const starfields = document.querySelectorAll('.starfield');
  starfields.forEach(field => {
    field.innerHTML = ''; // Clear out
    const numStars = field.dataset.stars || 40;
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'absolute bg-white rounded-full twinkle-star';
      
      // Random coordinates
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // Random sizes (mostly tiny, a few medium)
      const size = Math.random() < 0.85 ? '1px' : (Math.random() < 0.95 ? '2px' : '3px');
      // Random animation configurations
      const duration = 2 + Math.random() * 4;
      const delay = Math.random() * 3;
      const opacity = 0.1 + Math.random() * 0.8;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = size;
      star.style.height = size;
      star.style.opacity = opacity;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      
      field.appendChild(star);
    }
  });
}

// 6. Intersection Observer Scroll Reveal
function initScrollReveal() {
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, options);
  
  // Tag elements with 'scroll-reveal' and starting classes 'opacity-0 translate-y-8 transition duration-700 ease-out'
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition', 'duration-700', 'ease-out');
    observer.observe(el);
  });
}

// Global actions
window.toggleRTL = toggleRTL;
window.toggleTheme = toggleTheme;
window.toggleMobileNav = toggleMobileNav;

// Simulated newsletter handler
window.handleSubscribe = (e) => {
  e.preventDefault();
  alert('Thank you! You have subscribed to the Aura Lunar alerts pipeline.');
  e.target.reset();
};
