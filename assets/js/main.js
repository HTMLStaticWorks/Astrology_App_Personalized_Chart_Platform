// Aura Astrology Platform - Core JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  injectComponents();
  generateStarfields();
  initScrollReveal();
  initScrollToTop();
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
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-400 hover:text-amber-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    logo: 'ASTRO',
    home: 'Home',
    home2: 'Home 2',
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
    logo: 'أسترو',
    home: 'الرئيسية',
    home2: 'الرئيسية ٢',
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
    toggle.innerHTML = `<span class="font-bold text-xs uppercase">${isRtl ? 'LTR' : 'RTL'}</span>`;
  });
}

function translateLayout() {
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  const lang = isRtl ? 'ar' : 'en';
  const t = translations[lang];

  // Dynamic navbar translates
  document.querySelectorAll('[data-t-logo]').forEach(el => el.textContent = t.logo);
  document.querySelectorAll('[data-t-home]').forEach(el => el.textContent = t.home);
  document.querySelectorAll('[data-t-home2]').forEach(el => el.textContent = t.home2);
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
      <nav class="fixed top-0 start-0 w-full z-50 border-b border-indigo-950/20 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Brand Logo -->
            <div class="flex items-center xl:flex-1">
              <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse text-amber-500 font-bold text-xl tracking-wider whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span data-t-logo class="font-serif text-slate-100 whitespace-nowrap">${t.logo}</span>
              </a>
            </div>

            <!-- Navigation Links -->
            <div class="hidden xl:flex items-center justify-center space-x-2 xl:space-x-4 rtl:space-x-reverse text-xs xl:text-sm font-medium">
              <a href="index.html" data-t-home class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'index.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.home}</a>
              <a href="index2.html" data-t-home2 class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'index2.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.home2}</a>
              <a href="about.html" data-t-about class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'about.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.about}</a>
              <a href="pricing.html" data-t-pricing class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'pricing.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.pricing}</a>
              <a href="sample-reports.html" data-t-samples class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'sample-reports.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.samples}</a>
              <a href="compatibility.html" data-t-compatibility class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'compatibility.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.compatibility}</a>
              <a href="contact.html" data-t-contact class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'contact.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.contact}</a>
              <a href="dashboard.html" data-t-dashboard class="hover:text-amber-500 transition-colors whitespace-nowrap ${currentPath === 'dashboard.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.dashboard}</a>
            </div>

            <!-- Right-Side Utilities & CTAs -->
            <div class="hidden xl:flex items-center justify-end xl:flex-1 space-x-1.5 xl:space-x-2 rtl:space-x-reverse">
              <!-- Secondary CTA Removed -->
              <!-- Primary CTA -->
              <a href="signup.html" data-t-cta-primary class="h-10 flex items-center justify-center px-2.5 xl:px-4 bg-gradient-to-r from-violet-700 to-indigo-800 hover:from-violet-600 hover:to-indigo-700 text-white font-semibold text-[11px] xl:text-xs tracking-wider uppercase rounded shadow-lg shadow-indigo-900/30 transition-all duration-300 gold-hover-ring whitespace-nowrap flex-shrink-0">${t.ctaPrimary}</a>
              
              <!-- Divider -->
              <div class="w-px h-6 bg-slate-800"></div>

              <!-- Dark/Light Theme Toggle -->
              <button onclick="toggleTheme()" class="theme-toggle w-10 h-10 flex items-center justify-center rounded border border-slate-800 hover:bg-slate-900/30 transition-all duration-200 flex-shrink-0">
                <!-- Inner HTML is dynamically generated by updateThemeUI() -->
              </button>

              <button onclick="toggleRTL()" class="rtl-toggle h-10 w-10 xl:w-12 flex items-center justify-center border border-slate-700 hover:border-amber-500 rounded text-slate-300 hover:text-amber-400 font-medium transition-all duration-200 flex-shrink-0">
                <!-- Inner HTML is dynamically generated by updateRTLUI() -->
              </button>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <div class="flex xl:hidden items-center space-x-2 rtl:space-x-reverse">
              <!-- Dark/Light Theme Toggle -->
              <button onclick="toggleTheme()" class="theme-toggle w-10 h-10 flex items-center justify-center rounded border border-slate-800 hover:bg-slate-900/30 transition-all duration-200 flex-shrink-0">
                <!-- Inner HTML is dynamically generated by updateThemeUI() -->
              </button>

              <button onclick="toggleRTL()" class="rtl-toggle h-10 w-10 flex items-center justify-center border border-slate-700 hover:border-amber-500 rounded text-slate-300 hover:text-amber-400 font-medium transition-all duration-200 flex-shrink-0">
                <!-- Inner HTML is dynamically generated by updateRTLUI() -->
              </button>

              <!-- Mobile Hamburger Toggle -->
              <button onclick="toggleMobileNav()" class="w-10 h-10 flex items-center justify-center rounded border border-slate-800 hover:bg-slate-900/30 text-slate-300 hover:text-amber-500 focus:outline-none transition-all duration-200 flex-shrink-0">
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
        <div id="mobile-menu" class="hidden xl:hidden border-t border-indigo-950/20 bg-slate-950/95 px-4 pt-2 pb-6 space-y-3 flex flex-col text-base font-medium shadow-2xl transition-all duration-300">
          <a href="index.html" data-t-home class="py-2 border-b border-slate-800/40 ${currentPath === 'index.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.home}</a>
          <a href="index2.html" data-t-home2 class="py-2 border-b border-slate-800/40 ${currentPath === 'index2.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.home2}</a>
          <a href="about.html" data-t-about class="py-2 border-b border-slate-800/40 ${currentPath === 'about.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.about}</a>
          <a href="pricing.html" data-t-pricing class="py-2 border-b border-slate-800/40 ${currentPath === 'pricing.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.pricing}</a>
          <a href="sample-reports.html" data-t-samples class="py-2 border-b border-slate-800/40 ${currentPath === 'sample-reports.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.samples}</a>
          <a href="compatibility.html" data-t-compatibility class="py-2 border-b border-slate-800/40 ${currentPath === 'compatibility.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.compatibility}</a>
          <a href="contact.html" data-t-contact class="py-2 border-b border-slate-800/40 ${currentPath === 'contact.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.contact}</a>
          <a href="dashboard.html" data-t-dashboard class="py-2 border-b border-slate-800/40 ${currentPath === 'dashboard.html' ? 'text-amber-500 font-semibold' : 'text-slate-300'}">${t.dashboard}</a>
          
          <div class="flex flex-col gap-2 pt-2">
            <a href="signup.html" data-t-cta-primary class="w-full text-center px-4 py-2 bg-gradient-to-r from-violet-700 to-indigo-800 text-white font-semibold text-sm rounded shadow-lg transition-all">${t.ctaPrimary}</a>
          </div>
        </div>
      </nav>
    `;
    updateThemeUI();
    updateRTLUI();
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="bg-slate-950 border-t border-indigo-950/30 text-slate-400 py-16 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <!-- Column 1: Brand -->
          <div class="space-y-4">
            <a href="index.html" class="inline-flex items-center space-x-2 rtl:space-x-reverse text-amber-500 hover:text-amber-400 transition-colors font-bold text-lg tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span data-t-logo class="font-serif">${t.logo}</span>
            </a>
            <p data-t-footer-tag class="text-sm font-light text-slate-500">${t.footerTag}</p>
            <div class="flex space-x-4 rtl:space-x-reverse pt-2">
              <!-- Twitter/X -->
              <a href="#" class="text-slate-400 hover:text-amber-500 transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <!-- Facebook -->
              <a href="#" class="text-slate-400 hover:text-amber-500 transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
              </a>
              <!-- Instagram -->
              <a href="#" class="text-slate-400 hover:text-amber-500 transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
              </a>
            </div>
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

// 7. Scroll to Top Button
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  // Check if we are on dashboard where we might want the button positioned differently?
  // Using end-6 works well for LTR/RTL support.
  btn.className = 'fixed bottom-6 end-6 z-50 p-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 translate-y-4 gold-hover-ring focus:outline-none';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
    </svg>
  `;
  
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    // Only show button if we've scrolled down at least 300px
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
