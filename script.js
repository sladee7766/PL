document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Language First
    const savedLang = localStorage.getItem('app_lang') || 'en';
    applyLanguage(savedLang);

    // 2. About Me Menu
    const aboutMeBtn = document.getElementById('aboutMeBtn');
    const aboutMeDropdown = document.getElementById('aboutMeDropdown');
    if (aboutMeBtn && aboutMeDropdown) {
        aboutMeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            aboutMeDropdown.classList.toggle('show');
        });
    }

    // 3. Settings Menu (FIXED)
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            settingsPanel.classList.toggle('active');
        });
    }

    // Close Dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (aboutMeDropdown && !aboutMeDropdown.contains(e.target) && e.target !== aboutMeBtn) {
            aboutMeDropdown.classList.remove('show');
        }
        if (settingsPanel && !settingsPanel.contains(e.target) && e.target !== settingsBtn) {
            settingsPanel.classList.remove('active');
        }
    });

    // 4. Homepage Recommendations
    if (document.getElementById('recommendations-container')) {
        loadRecommendations();
    }
});

const translations = {
    en: {
        nav_lineups: "Lineups", nav_news: "News", nav_videos: "Videos", nav_about: "About Me",
        welcome_title: "Welcome to Pl", welcome_desc: "Professional Valorant tactical data and lineups.",
        rec_title: "Recommended for You", come_back: "Come back later!", settings_title: "Settings",
        reset_view: "Reset View", sel_map: "Map", sel_agent: "Agent", preview_title: "Lineup Preview", 
        go_back: "Go Back Home", lang_label: "Language", news_header: "Latest News",
        search_placeholder: "Search Agent...", side_label: "Side", side_all: "All", 
        side_atk: "Attack", side_def: "Defense", diff_label: "Difficulty",
        easy: "Easy", medium: "Medium", hard: "Hard", copy_link: "Copy Link", link_copied: "Copied!",
        read_more: "Read Article"
    },
    tr: {
        nav_lineups: "Lineuplar", nav_news: "Haberler", nav_videos: "Videolar", nav_about: "Hakkımda",
        welcome_title: "Pl'ye Hoş Geldiniz", welcome_desc: "Profesyonel Valorant taktik verileri ve lineupları.",
        rec_title: "Sizin İçin Önerilenler", come_back: "Daha sonra tekrar gel!", settings_title: "Ayarlar",
        reset_view: "Sıfırla", sel_map: "Harita", sel_agent: "Ajan", preview_title: "Lineup Önizleme", 
        go_back: "Ana Sayfaya Dön", lang_label: "Dil", news_header: "Son Haberler",
        search_placeholder: "Ajan Ara...", side_label: "Taraf", side_all: "Hepsi", 
        side_atk: "Saldırı", side_def: "Savunma", diff_label: "Zorluk",
        easy: "Kolay", medium: "Orta", hard: "Zor", copy_link: "Linki Kopyala", link_copied: "Kopyalandı!",
        read_more: "Haberi Oku"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('app_lang', lang);
    location.reload();
}

function applyLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT') el.placeholder = dict[key];
            else el.textContent = dict[key];
        }
    });
}

function loadRecommendations() {
    const container = document.getElementById('recommendations-container');
    const lang = localStorage.getItem('app_lang') || 'en';
    const videoData = []; // Blank placeholder
    
    const pool = [
        ...lineupData.map(item => ({ ...item, type: 'lineup', url: `lineup.html?map=${item.map}&agent=${item.agent}&ability=${item.ability}&title=${encodeURIComponent(item.title)}` })),
        ...(typeof newsData !== 'undefined' ? newsData.map(item => ({ ...item, type: 'news', title: item.title[lang], url: 'news.html', image: item.thumbnail })) : []),
        ...videoData.map(item => ({...item, type: 'video', url: 'videos.html'}))
    ];

    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 12);
    container.innerHTML = "";
    
    if(shuffled.length === 0) {
        container.innerHTML = `<p class="empty-state" data-i18n="come_back">${translations[lang].come_back}</p>`;
        return;
    }

    shuffled.forEach(item => {
        const card = document.createElement('a');
        card.className = 'recommendation-card'; card.href = item.url;
        const img = item.image || `agents/${item.agent}.png`;
        card.innerHTML = `
            <div class="card-image-wrapper"><img src="${img}" onerror="this.src='picture/logo.png'"></div>
            <div class="card-content">
                <span class="badge ${item.type}">${item.type.toUpperCase()}</span>
                <h3 style="margin-top:10px; font-size:15px;">${item.title}</h3>
            </div>`;
        container.appendChild(card);
    });
}
