document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Handler
    const savedLang = localStorage.getItem('app_lang') || 'en';
    applyLanguage(savedLang);

    // 2. About Me Toggle
    const aboutMeBtn = document.getElementById('aboutMeBtn');
    const aboutMeDropdown = document.getElementById('aboutMeDropdown');
    if (aboutMeBtn) {
        aboutMeBtn.onclick = (e) => { e.preventDefault(); aboutMeDropdown.classList.toggle('show'); };
        document.addEventListener('click', (e) => { if (!aboutMeBtn.contains(e.target)) aboutMeDropdown.classList.remove('show'); });
    }

    // 3. Settings Toggle
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsBtn) settingsBtn.onclick = () => settingsPanel.classList.toggle('active');

    // 4. Load Homepage Content
    if (document.getElementById('recommendations-container')) loadRecommendations();
});

const translations = {
    en: {
        nav_lineups: "Lineups", nav_news: "News", nav_videos: "Videos", nav_about: "About Me",
        welcome_title: "Welcome to Pl", welcome_desc: "Professional Valorant tactical data and lineups.",
        rec_title: "Recommended for You", come_back: "Come back later!", settings_title: "Settings",
        reset_view: "Reset View", sel_map: "Select Map", sel_agent: "Select Agent", preview_title: "Lineup Preview", 
        go_back: "Go Back Home", lang_label: "Language"
    },
    tr: {
        nav_lineups: "Lineuplar", nav_news: "Haberler", nav_videos: "Videolar", nav_about: "Hakkımda",
        welcome_title: "Pl'ye Hoş Geldiniz", welcome_desc: "Profesyonel Valorant taktik verileri ve lineupları.",
        rec_title: "Sizin İçin Önerilenler", come_back: "Daha sonra tekrar gel!", settings_title: "Ayarlar",
        reset_view: "Görünümü Sıfırla", sel_map: "Harita Seç", sel_agent: "Ajan Seç", preview_title: "Lineup Önizleme", 
        go_back: "Ana Sayfaya Dön", lang_label: "Dil"
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

// Data for News and Videos (Add items here to fill up the 12 slots)
const newsData = []; 
const videoData = []; 

function loadRecommendations() {
    const container = document.getElementById('recommendations-container');
    if (!container) return;

    // 1. Combine all types of content into one pool
    // We mark them with types so we can color the badges correctly
    const pool = [
        ...lineupData.map(item => ({ ...item, type: 'lineup', url: `lineup.html?map=${item.map}&agent=${item.agent}&ability=${item.ability}&title=${encodeURIComponent(item.title)}` })),
        ...newsData.map(item => ({ ...item, type: 'news', url: 'news.html' })),
        ...videoData.map(item => ({ ...item, type: 'video', url: 'videos.html' }))
    ];

    // 2. Shuffle the pool randomly
    const shuffled = pool.sort(() => 0.5 - Math.random());

    // 3. Take up to 12 items
    const displayItems = shuffled.slice(0, 12);

    container.innerHTML = "";

    // 4. If nothing exists yet, show placeholders
    if (displayItems.length === 0) {
        container.innerHTML = `<p class="empty-state" data-i18n="come_back">Come back later!</p>`;
        return;
    }

    displayItems.forEach(item => {
        const card = document.createElement('a');
        card.className = 'recommendation-card';
        card.href = item.url;
        
        // Determine image
        const imgPath = item.image || (item.agent ? `agents/${item.agent}.png` : 'picture/logo.png');

        card.innerHTML = `
            <div class="card-image-wrapper"><img src="${imgPath}" onerror="this.src='picture/logo.png'"></div>
            <div class="card-content">
                <div class="card-header-info">
                    <span class="badge ${item.type}">${item.type.toUpperCase()}</span>
                </div>
                <h3 style="margin-top:10px; font-size:16px;">${item.title}</h3>
            </div>`;
        container.appendChild(card);
    });
}