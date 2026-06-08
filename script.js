/**
 * Pl - Tactical Engine
 * BETA BUILD v1.0.0
 */

// --- 1. AUDIO ENGINE (Soft High-Tech SFX) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playClick() {
    if(localStorage.getItem('app_sfx') === 'off') return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}

function playSwoosh() {
    if(localStorage.getItem('app_sfx') === 'off') return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.2);
}

// Global click listener for sounds
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.map-dot') || e.target.closest('.news-row') || e.target.closest('.map-banner')) {
        playClick();
    }
});

// --- 2. AGENT THEMES (Yeni Neon ve Canlı Renkler) ---
const agentColors = {
    sova: { p: "#00e5ff", a: "#80dfff" },   // Neon Mavi
    viper: { p: "#00ff66", a: "#99ffcc" },  // Neon Yeşil
    brimstone: { p: "#ff6600", a: "#ffb380" }, // Canlı Turuncu
    killjoy: { p: "#ffcc00", a: "#ffe680" }, // Canlı Sarı
    cypher: { p: "#e6b800", a: "#fff0b3" },  // Altın
    deadlock: { p: "#cccccc", a: "#ffffff" },// Parlak Gri/Beyaz
    fade: { p: "#b366ff", a: "#d9b3ff" },    // Neon Mor
    kayo: { p: "#3385ff", a: "#99c2ff" },    // Canlı Lacivert/Mavi
    miks: { p: "#ff3333", a: "#ff9999" },    // Neon Kırmızı
    veto: { p: "#ff5050", a: "#ffb3b3" },    // Pastel Kırmızı
    vyse: { p: "#ff33cc", a: "#ffb3ec" }     // Neon Pembe
};

function applyAgentTheme(agent) {
    const root = document.documentElement;
    const colors = agentColors[agent.toLowerCase()];
    if(colors) {
        root.style.setProperty('--primary-color', colors.p); 
        root.style.setProperty('--accent-gold', colors.a);
    } else {
        // Default Neon Yeşil & Sarı
        root.style.setProperty('--primary-color', '#00ffcc'); 
        root.style.setProperty('--accent-gold', '#ffcc00');
    }
}

// --- 3. TRANSLATIONS (Safe Strings) ---
const translations = {
    en: {
        nav_lineups: "Lineups", nav_news: "News", nav_videos: "Videos", nav_about: "About Me", nav_cross: "Crosshairs", nav_sub: "Submit",
        welcome_title: "Welcome to Pl", welcome_desc: "Professional Valorant tactical data.",
        rec_title: "Recommended", come_back: "Come back later!", settings_title: "Settings",
        reset_view: "Reset View", sel_map: "Map", sel_agent: "Agent", preview_title: "Preview", 
        go_back: "Go Back", lang_label: "Language", search_placeholder: "Search Agent...", 
        side_label: "Side", side_all: "All", side_atk: "Attack", side_def: "Defense", 
        diff_label: "Difficulty", easy: "Easy", medium: "Medium", hard: "Hard", 
        copy_link: "Copy Link", link_copied: "Copied!", fav_filter: "Favorites", 
        save_strat: "Save", remove_strat: "Saved", sub_title: "Submit a Lineup", sub_btn: "Send Lineup",
        news_header: "Latest News", read_more: "Read Article", submit_desc: "Found a god-tier lineup? Send it to us!",
        sub_name: "Your Name / Discord", sub_map: "Map & Agent", sub_vid: "Video Link (YouTube)", sub_desc: "Description / Details",
        sub_name_ph: "Sladee#1234", sub_map_ph: "e.g. Sova on Ascent", sub_vid_ph: "https://...", sub_desc_ph: "Where does it land?"
    },
    tr: {
        nav_lineups: "Lineuplar", nav_news: "Haberler", nav_videos: "Videolar", nav_about: "Hakkımda", nav_cross: "Nişangahlar", nav_sub: "Gönder",
        welcome_title: "Pl'ye Hoş Geldiniz", welcome_desc: "Profesyonel Valorant taktik verileri.",
        rec_title: "Önerilenler", come_back: "Daha sonra tekrar gel!", settings_title: "Ayarlar",
        reset_view: "Sıfırla", sel_map: "Harita", sel_agent: "Ajan", preview_title: "Önizleme", 
        go_back: "Geri Dön", lang_label: "Dil", search_placeholder: "Ajan Ara...", 
        side_label: "Taraf", side_all: "Hepsi", side_atk: "Saldırı", side_def: "Savunma", 
        diff_label: "Zorluk", easy: "Kolay", medium: "Orta", hard: "Zor", 
        copy_link: "Linki Kopyala", link_copied: "Kopyalandı!", fav_filter: "Favoriler", 
        save_strat: "Kaydet", remove_strat: "Kaydedildi", sub_title: "Lineup Gönder", sub_btn: "Gönder",
        news_header: "Son Haberler", read_more: "Haberi Oku", submit_desc: "Mükemmel bir lineup mı buldun? Bize gönder!",
        sub_name: "İsminiz / Discord", sub_map: "Harita ve Ajan", sub_vid: "Video Linki (YouTube)", sub_desc: "Açıklama / Detaylar",
        sub_name_ph: "Sladee#1234", sub_map_ph: "Örn. Ascent'te Sova", sub_vid_ph: "https://...", sub_desc_ph: "Nereye düşüyor?"
    }
};

function changeLanguage(lang) { localStorage.setItem('app_lang', lang); location.reload(); }
function applyLanguage(lang) {
    const dict = translations[lang];
    if(!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) { if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = dict[key]; else el.textContent = dict[key]; }
    });
}

// --- 4. HOMEPAGE RANDOMIZER (12 Slots) ---
function loadRecommendations() {
    const container = document.getElementById('recommendations-container');
    if (!container) return;
    const lang = localStorage.getItem('app_lang') || 'en';
    const pool = [
        ...(typeof lineupData !== 'undefined' ? lineupData.map(item => ({ ...item, type: 'lineup', url: `lineup.html?map=${item.map}&agent=${item.agent}&ability=${item.ability}&title=${encodeURIComponent(item.title)}` })) : []),
        ...(typeof newsData !== 'undefined' ? newsData.map(item => ({ ...item, type: 'news', title: item.title[lang] || item.title['en'], url: `news.html?id=${item.id}`, image: item.thumbnail })) : []),
        ...(typeof videoData !== 'undefined' ? videoData.map(item => ({ ...item, type: 'video', title: item.title[lang] || item.title['en'], url: `videos.html?id=${item.id}`, image: item.thumbnail, duration: item.duration })) : [])
    ];
    
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 12);
    container.innerHTML = "";
    
    if(shuffled.length === 0) { 
        container.innerHTML = `<p class="empty-state" data-i18n="come_back">${translations[lang].come_back}</p>`; 
        return; 
    }
    
    shuffled.forEach(item => {
        const card = document.createElement('a'); card.className = 'recommendation-card'; card.href = item.url;
        const img = item.image || (item.agent ? `agents/${item.agent}.png` : 'picture/logo.png');
        const durHtml = item.duration ? `<div class="video-duration">${item.duration}</div>` : '';
        card.innerHTML = `<div class="card-image-wrapper"><img src="${img}" onerror="this.src='picture/logo.png'">${durHtml}</div><div class="card-content"><span class="badge ${item.type}">${item.type.toUpperCase()}</span><h3 style="margin-top:10px; font-size:15px; color:white;">${item.title}</h3></div>`;
        container.appendChild(card);
    });
}

// --- 5. FAVORITES SYSTEM ---
function getFavorites() { return JSON.parse(localStorage.getItem('app_favs') || '[]'); }
function isFavorite(title) { return getFavorites().includes(title); }
function toggleFavorite(title) {
    let f = getFavorites();
    if (f.includes(title)) f = f.filter(x => x !== title); else f.push(title);
    localStorage.setItem('app_favs', JSON.stringify(f)); return f.includes(title);
}

// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(localStorage.getItem('app_lang') || 'en');
    
    // UI Toggles (About Me & Settings)
    const amBtn = document.getElementById('aboutMeBtn'), amDrop = document.getElementById('aboutMeDropdown');
    const setBtn = document.getElementById('settingsBtn'), setPan = document.getElementById('settingsPanel');
    
    if (amBtn) amBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); amDrop.classList.toggle('show'); };
    if (setBtn) setBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); setPan.classList.toggle('active'); };
    
    document.addEventListener('click', (e) => {
        if (amDrop && !amDrop.contains(e.target)) amDrop.classList.remove('show');
        if (setPan && !setPan.contains(e.target)) setPan.classList.remove('active');
    });
    
    // SFX Toggle System
    const sfxBtn = document.getElementById('sfxToggleBtn');
    if(sfxBtn) {
        const sfx = localStorage.getItem('app_sfx') || 'on';
        sfxBtn.innerText = sfx === 'on' ? "Sound: ON" : "Sound: OFF";
        sfxBtn.onclick = (e) => {
            e.stopPropagation();
            const newVal = localStorage.getItem('app_sfx') === 'on' ? 'off' : 'on';
            localStorage.setItem('app_sfx', newVal);
            sfxBtn.innerText = newVal === 'on' ? "Sound: ON" : "Sound: OFF";
            if(newVal === 'on') playClick();
        };
    }
    
    // Load Homepage if applicable
    if (document.getElementById('recommendations-container')) loadRecommendations();
});
