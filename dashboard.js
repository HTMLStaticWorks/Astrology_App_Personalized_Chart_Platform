// Aura Astrology - Client Dashboard Controller

document.addEventListener('DOMContentLoaded', () => {
  initDashboardRouter();
  initHoroscopeFilters();
  initCompatibilityCalculator();
  initAstrologerChat();
  initCalendarScheduler();
  initDragAndDropUpload();
  
  // Trigger initial calculation loading overlay
  runCalculationOverlay("Generating your personal natal blueprint...", () => {
    // Generate initial birth charts on load
    if (typeof createBirthChart === 'function') {
      createBirthChart('natal-chart-container');
    }
  });
});

// 1. Sidebar Panel Switching
function initDashboardRouter() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const panels = document.querySelectorAll('.dashboard-panel');
  const sidebarToggle = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('dashboard-sidebar');

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetPanel = item.getAttribute('data-panel');
      if (!targetPanel) return;

      // Update sidebar styling
      sidebarItems.forEach(si => si.classList.remove('bg-amber-500/10', 'text-amber-500', 'border-s-4', 'border-amber-500'));
      item.classList.add('bg-amber-500/10', 'text-amber-500', 'border-s-4', 'border-amber-500');

      // Swap panel visibilities
      panels.forEach(panel => {
        if (panel.id === `${targetPanel}-panel`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });

      // Special triggers on panel load
      if (targetPanel === 'chart' && typeof createBirthChart === 'function') {
        createBirthChart('natal-chart-container-large');
      }

      // Close mobile sidebar if open
      if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full', 'rtl:translate-x-full');
      }
    });
  });

  // Mobile sidebar toggle handler
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('rtl:translate-x-full');
    });
  }
}

// 2. Cosmic Progress Bar Simulator
function runCalculationOverlay(headline, onComplete) {
  const overlay = document.getElementById('calculation-overlay');
  const progressText = document.getElementById('calc-progress-text');
  const progressBar = document.getElementById('calc-progress-bar');
  
  if (!overlay || !progressText || !progressBar) {
    if (onComplete) onComplete();
    return;
  }

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const steps = [
    { text: 'Syncing planetary degrees...', limit: 25 },
    { text: 'Mapping houses & Ascendant cusp...', limit: 50 },
    { text: 'Calculating aspect configurations (trines, squares)...', limit: 75 },
    { text: 'Finalizing celestial report profile...', limit: 95 },
    { text: 'Cosmic alignment complete.', limit: 100 }
  ];

  let progress = 0;
  let stepIndex = 0;
  
  progressBar.style.width = '0%';
  progressText.textContent = steps[0].text;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;
    if (progress >= 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    
    if (stepIndex < steps.length && progress >= steps[stepIndex].limit) {
      progressText.textContent = steps[stepIndex].text;
      stepIndex++;
    }

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.classList.remove('modal-open');
        if (onComplete) onComplete();
      }, 700);
    }
  }, 100);
}

// 3. Horoscope Feed Range Switching
const horoscopesData = {
  today: {
    mood: 'Intuitive & Focus', love: 85, career: 70, energy: 90,
    text: 'Today, the Moon trines Saturn in your transit sector. You will feel a strong impulse to settle structural affairs at work. Listen to your gut feelings. A subtle shift in your communication style will resolve an ongoing misunderstanding.'
  },
  tomorrow: {
    mood: 'Dynamic & Charismatic', love: 92, career: 88, energy: 75,
    text: 'Tomorrow brings a fiery Mars conjunct Ascendant energy. Your creative vitality is soaring. This is an ideal alignment to pitch bold ideas or reveal hidden feelings. Avoid rushing financial transactions.'
  },
  weekly: {
    mood: 'Reflective & Growth', love: 78, career: 82, energy: 80,
    text: 'This week is characterized by Mercury entering Cancer, focusing heavily on family ties, inner security, and home-base goals. You will find clarity regarding your professional path around the upcoming full moon.'
  },
  monthly: {
    mood: 'Transformative', love: 80, career: 90, energy: 85,
    text: 'July 2026 presents a rare double-sextile. It offers the foundation to rebuild projects that were halted in early spring. Major relational breakthroughs are aligned for the third week as Venus enters your house of partnerships.'
  }
};

function initHoroscopeFilters() {
  const tabs = document.querySelectorAll('.horoscope-tab');
  const feedText = document.getElementById('horoscope-feed-text');
  const indicatorMood = document.getElementById('horo-indicator-mood');
  const indicatorLove = document.getElementById('horo-indicator-love');
  const indicatorCareer = document.getElementById('horo-indicator-career');
  const indicatorEnergy = document.getElementById('horo-indicator-energy');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500'));
      tabs.forEach(t => t.classList.add('border-transparent', 'text-slate-400'));
      
      tab.classList.remove('border-transparent', 'text-slate-400');
      tab.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500');

      const range = tab.getAttribute('data-range');
      const data = horoscopesData[range];

      if (data) {
        feedText.textContent = data.text;
        indicatorMood.textContent = data.mood;
        
        // Update circular indicators / bar scores
        updateProgressBar('horo-bar-love', data.love);
        updateProgressBar('horo-bar-career', data.career);
        updateProgressBar('horo-bar-energy', data.energy);
      }
    });
  });
}

function updateProgressBar(id, value) {
  const bar = document.getElementById(id);
  if (bar) {
    bar.style.width = `${value}%`;
    bar.previousElementSibling.querySelector('.bar-val').textContent = `${value}%`;
  }
}

// 4. Compatibility Form & SVG Wheel Generator
function initCompatibilityCalculator() {
  const form = document.getElementById('compatibility-calc-form');
  const resultsDiv = document.getElementById('compatibility-results');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      runCalculationOverlay("Mapping relationship sinastry charts...", () => {
        // Show results container
        if (resultsDiv) {
          resultsDiv.classList.remove('hidden');
          resultsDiv.scrollIntoView({ behavior: 'smooth' });
        }

        // Draw the partner comparison chart wheel
        if (typeof createBirthChart === 'function') {
          createBirthChart('compatibility-chart-container', true);
        }

        // Trigger score calculations animations
        animateScoreCircle('score-emotional', 92);
        animateScoreCircle('score-romantic', 88);
        animateScoreCircle('score-communication', 79);
        animateScoreCircle('score-longterm', 85);
      });
    });
  }
}

function animateScoreCircle(id, targetVal) {
  const element = document.getElementById(id);
  if (!element) return;

  let current = 0;
  const interval = setInterval(() => {
    current += 2;
    element.textContent = `${current}%`;
    if (current >= targetVal) {
      element.textContent = `${targetVal}%`;
      clearInterval(interval);
    }
  }, 20);
}

// 5. Astrologer Live Chat Engine
function initAstrologerChat() {
  const chatForm = document.getElementById('chat-send-form');
  const chatInput = document.getElementById('chat-message-input');
  const chatLog = document.getElementById('chat-message-log');

  if (chatForm && chatInput && chatLog) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = chatInput.value.trim();
      if (!messageText) return;

      // Add user message to log
      appendMessage('user', messageText);
      chatInput.value = '';

      // Auto scroll
      chatLog.scrollTop = chatLog.scrollHeight;

      // Simulated responses from astrologer Aria
      setTimeout(() => {
        const responses = [
          "I am checking the ephemeris for your transit. Your Mars is transiting your Tenth house, bringing highly constructive career energy this month.",
          "Greetings! Your synastry chart with this partner shows a rare Moon-Venus conjunction, suggesting immediate emotional resonance.",
          "The transit chart indicates your Saturn return will finalize its transit in early autumn. That is when long-term commitments will solidify.",
          "Excellent question. I am analyzing the planetary degrees right now. Let's outline this in our upcoming live session."
        ];
        const randomReply = responses[Math.floor(Math.random() * responses.length)];
        appendMessage('astrologer', randomReply);
        chatLog.scrollTop = chatLog.scrollHeight;
      }, 1500);
    });
  }
}

function appendMessage(sender, text) {
  const log = document.getElementById('chat-message-log');
  const bubble = document.createElement('div');
  bubble.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

  const isLight = document.documentElement.classList.contains('light');
  
  if (sender === 'user') {
    bubble.innerHTML = `
      <div class="bg-amber-500 text-slate-950 text-xs px-4 py-2 rounded-lg max-w-xs shadow-md">
        <p>${text}</p>
        <span class="text-[9px] block text-right mt-1 opacity-70">Just Now</span>
      </div>
    `;
  } else {
    bubble.innerHTML = `
      <div class="bg-slate-200 dark:bg-indigo-950/50 text-slate-900 dark:text-slate-100 border border-indigo-900/20 text-xs px-4 py-2 rounded-lg max-w-xs shadow-md">
        <p>${text}</p>
        <span class="text-[9px] block mt-1 text-slate-600 dark:text-slate-400">Astrologer Aria</span>
      </div>
    `;
  }
  log.appendChild(bubble);
}

// 6. Calendar Scheduler Booking
function initCalendarScheduler() {
  const slots = document.querySelectorAll('.schedule-slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('bg-amber-500', 'text-slate-950', 'border-amber-500'));
      slot.classList.add('bg-amber-500', 'text-slate-950', 'border-amber-500');

      const date = slot.dataset.date;
      const time = slot.dataset.time;

      setTimeout(() => {
        alert(`Booking requested for ${date} at ${time}. Astrologer Aria Thorne will approve shortly.`);
      }, 100);
    });
  });
}

// 7. Drag-and-Drop File Upload UI
function initDragAndDropUpload() {
  const dropZone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('upload-file-input');
  const fileList = document.getElementById('uploaded-files-list');

  if (dropZone && fileInput && fileList) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-amber-500', 'bg-amber-500/5');
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('border-amber-500', 'bg-amber-500/5');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
    });
  }
}

function handleFiles(files) {
  const fileList = document.getElementById('uploaded-files-list');
  if (!fileList || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between text-xs bg-indigo-950/20 p-2.5 rounded border border-slate-800/80 mb-2';
    item.innerHTML = `
      <div class="flex items-center space-x-2 rtl:space-x-reverse text-slate-700 dark:text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>${file.name} (${Math.round(file.size / 1024)} KB)</span>
      </div>
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-emerald-500 text-[10px] uppercase font-bold">Uploaded</span>
        <button onclick="this.parentElement.parentElement.remove()" class="text-slate-500 hover:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `;
    fileList.appendChild(item);
  }
}
