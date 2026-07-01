const siteTexts = {
    // Navigation Bar
    navLineups: "Lineups",
    navCrosshairs: "Crosshairs",
    navNews: "News",
    navVideos: "Videos",
    navSubmit: "Submit",
    navFavorites: "Favorites", // NEW

    // Home Page
    homeLineupsTitle: "Latest Lineups",
    homeCrosshairsTitle: "Popular Crosshairs",
    homeNewsTitle: "Latest News",
    homeVideosTitle: "Latest Videos",

    // Favorites Page
    favoritesTitle: "My Saved Lineups", // NEW
    favoritesEmpty: "You haven't saved any lineups yet. Go click some hearts!", // NEW

    // Crosshairs Page
    crosshairsTitle: "Pro & Community Crosshairs",
    crosshairCopyBtn: "Copy Code",
    crosshairCopiedAlert: "Crosshair code copied to clipboard!",

    // Lineup Page
    lineupSelectMap: "Select a Map",
    lineupSelectAgent: "Select an Agent",
    lineupBackToMaps: "← Back to Maps",
    lineupBackToAgents: "← Back to Agents",
    lineupGuideTitle: "Map Guide",
    lineupGuideDesc: "1. <b>Hover</b> over a gold pin to see where it can be shot from.<br>2. <b>Click</b> a gold pin to lock it.<br>3. <b>Click</b> a green pin to watch the video.<br><br><i>Developer Tip: Hold SHIFT and click anywhere on the map to get the X and Y coordinates!</i>",
    lineupTargetLocked: "Target Locked",
    lineupSelectGreenPin: "Select a green origin pin on the map to see the video and details.",
    lineupNoVideo: "No video added yet.",

    // News Page
    newsTitle: "Valorant Updates & News",
    newsReadMore: "Read More",

    // Videos Page
    videosTitle: "Latest Community Videos",
    videosLoading: "CONNECTING TO YOUTUBE...",

    // Submit Page
    submitPageTitle: "Submit or Report",
    submitFormTitle: "Submission Form",
    submitLabelType: "Submission Type",
    submitLabelTitle: "Title",
    submitLabelUser: "Username",
    submitLabelDesc: "Description",
    submitLabelVideo: "Video / Image Link",
    submitLabelCheck: "I agree that my submitted data and IP address will be transferred and stored.",
    submitBtn: "Send Submission",
    submitSuccess: "Successfully sent! Thank you.",
    submitError: "An error occurred. Please try again.",

    // Footer
    footerText: "BETA 1.0.0"
};

// Auto-Translate Engine
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-text]");
    elements.forEach(el => {
        const key = el.getAttribute("data-text");
        if (siteTexts[key]) {
            if (el.tagName === "INPUT" && el.type === "submit" || el.tagName === "BUTTON") {
                el.innerText = siteTexts[key];
            } else {
                el.innerHTML = siteTexts[key];
            }
        }
    });
});

// ==========================================
// GLOBAL FAVORITES ENGINE
// ==========================================
window.toggleFavorite = function(id, event, element) {
    if (event) event.stopPropagation(); // Stops the card from clicking when you click the heart
    
    let favs = JSON.parse(localStorage.getItem('lineup_favs') || '[]');
    
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id); // Remove it
        if (element) element.innerText = '🤍';
    } else {
        favs.push(id); // Add it
        if (element) element.innerText = '💛';
    }
    
    localStorage.setItem('lineup_favs', JSON.stringify(favs));
    
    // If we are on the favorites page, reload it so the removed card disappears
    if (window.location.pathname.includes("favorites.html")) {
        location.reload();
    }
};

window.isFavorite = function(id) {
    let favs = JSON.parse(localStorage.getItem('lineup_favs') || '[]');
    return favs.includes(id);
};
