const newsData = [
    {
        id: 2,
        type: "update",
        date: "2026-06-15",
        title: { en: "Site Update: New Video Overlays", tr: "Site Güncellemesi: Yeni Video Arayüzü" },
        thumbnail: "picture/logo.png",
        content: [
            { type: "text", en: "We have completely revamped the interactive map viewer.", tr: "Etkileşimli harita görüntüleyiciyi tamamen yeniledik." },
            { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { type: "text", en: "You can now drag, zoom, and view lineups with precision.", tr: "Artık haritayı sürükleyebilir, yakınlaştırabilir ve lineupları hassas bir şekilde görebilirsiniz." }
        ]
    },
    {
        id: 1,
        type: "update",
        date: "2026-07-05",
        title: { en: "site update", tr: "site güncellemesi" },
        thumbnail: "map_backgrounds/ascent.jpg",
        content: [
            { type: "text", en: "Fixed some bugs and added the videos tab with some place holders.", tr: "sitedeki buglar düzeltildi ve videolar kısmı yerine başka ekleninceye kadar boş videolarla geldi." },
            { type: "image", url: "map_backgrounds/ascent.jpg" },
            { type: "text", en: "If u want to add lineups to the website dm us.", tr: "websiteye lineup eklemek isterseniz dm den bize ulaşın." }
        ]
    }
];
