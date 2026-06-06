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
        type: "patch",
        date: "2026-06-05",
        title: { en: "Patch 9.08 Weapon Changes", tr: "Yama 9.08 Silah Değişiklikleri" },
        thumbnail: "map_backgrounds/ascent.jpg",
        content: [
            { type: "text", en: "The new patch brings massive changes to weapon recoil.", tr: "Yeni yama silah sekmesine büyük değişiklikler getiriyor." },
            { type: "image", url: "map_backgrounds/ascent.jpg" },
            { type: "text", en: "Lineups for Sova and Viper have been adjusted accordingly.", tr: "Sova ve Viper lineupları buna göre ayarlandı." }
        ]
    }
];