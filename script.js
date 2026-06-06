document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('app_lang') || 'en';
    applyLanguage(savedLang);

    const aboutMeBtn = document.getElementById('aboutMeBtn');
    const aboutMeDropdown = document.getElementById('aboutMeDropdown');
    if (aboutMeBtn && aboutMeDropdown) {
        aboutMeBtn.onclick = (e) => { e.preventDefault(); aboutMeDropdown.classList.toggle('show'); };
        document.addEventListener('click', (e) => { if (!aboutMeBtn.contains(e.target)) aboutMeDropdown.classList.remove('show'); });
    }

    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsBtn && settingsPanel) {
        settingsBtn.onclick = (e) => { e.stopPropagation(); settingsPanel.classList.toggle('active'); };
        document.addEventListener('click', (e) => { if (!settingsPanel.contains(e.target)) settingsPanel.classList.remove('active'); });
    }

    if (document.getElementById('recommendations-container')) loadRecommendations();
});

const translations = {
    en: {
        nav_lineups: "Lineups", nav_news: "News", nav_videos: "Videos", nav_about: "About Me",
        welcome_title: "Welcome to Pl", welcome_desc: "Professional Valorant tactical data.",
        rec_title: "Recommended", come_back: "Come back later!", settings_title: "Settings",
        reset_view: "Reset View", sel_map: "Map", sel_agent: "Agent", preview_title: "Lineup Preview", 
        go_back: "Go Back Home", lang_label: "Language", news_header: "Latest News"
    },
    tr: {
        nav_lineups: "Lineuplar", nav_news: "Haberler", nav_videos: "Videolar", nav_about: "Hakkımda",
        welcome_title: "Pl'ye Hoş Geldiniz", welcome_desc: "Profesyonel Valorant taktik verileri.",
        rec_title: "Önerilenler", come_back: "Daha sonra tekrar gel!", settings_title: "Ayarlar",
        reset_view: "Görünümü Sıfırla", sel_map: "Harita Seç", sel_agent: "Ajan Seç", preview_title: "Lineup Önizleme", 
        go_back: "Geri Dön", lang_label: "Dil", news_header: "Son Haberler"
    }
};

function changeLanguage(lang) { localStorage.setItem('app_lang', lang); location.reload(); }

function applyLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
}

function loadRecommendations() {
    const container = document.getElementById('recommendations-container');
    const lang = localStorage.getItem('app_lang') || 'en';
    const pool = [
        ...lineupData.map(item => ({ ...item, type: 'lineup', url: `lineup.html?map=${item.map}&agent=${item.agent}&ability=${item.ability}&title=${encodeURIComponent(item.title)}` })),
        ...(typeof newsData !== 'undefined' ? newsData.map(item => ({ ...item, type: 'news', title: item.title[lang], url: 'news.html', image: item.thumbnail })) : [])
    ];
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 12);
    container.innerHTML = "";
    shuffled.forEach(item => {
        const card = document.createElement('a');
        card.className = 'recommendation-card'; card.href = item.url;
        const img = item.image || `agents/${item.agent}.png`;
        card.innerHTML = `<div class="card-image-wrapper"><img src="${img}" onerror="this.src='picture/logo.png'"></div><div class="card-content"><span class="badge ${item.type}">${item.type.toUpperCase()}</span><h3 style="margin-top:10px; font-size:15px;">${item.title}</h3></div>`;
        container.appendChild(card);
    });
}