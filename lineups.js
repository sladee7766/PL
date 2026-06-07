const agents = ["brimstone", "cypher", "deadlock", "fade", "kayo", "killjoy", "miks", "sova", "veto", "viper", "vyse"];
const maps = ["ascent", "breeze", "fracture", "haven", "lotus", "pearl", "split"];

const abilityIcons = {
    sova: ["Recon", "Shock"],
    viper: ["Molly", "Orb"],
    brimstone: ["Molly"],
    deadlock: ["Molly", "Ult", "Setup", "Wall"],
    veto: ["Setup", "Outplay"],
    vyse: ["Setup"],
    fade: ["Recon", "Seize"],
    kayo: ["Molly", "Recon", "Flash"],
    killjoy: ["Molly", "Setup"],
    miks: ["Stun", "Ult"],
    cypher: ["Cage", "Setup"]
};

// I added various sides and difficulties here so you can test the filters immediately!
const lineupData = [
    {
        map: "ascent", agent: "sova", ability: "Recon", 
        side: "attack", difficulty: "easy", radius: 5,
        title: "A-Site God Recon",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 42.5, y: 15.2 }, origin: { x: 45.0, y: 85.0 }
    },
    {
        map: "ascent", agent: "sova", ability: "Recon", 
        side: "attack", difficulty: "hard", radius: 5,
        title: "A-Site Wine Recon",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 42.5, y: 15.2 }, origin: { x: 31.4, y: 62.6 }
    },
    {
        map: "ascent", agent: "sova", ability: "Recon", 
        side: "defense", difficulty: "medium", radius: 5,
        title: "B-Main Early Info",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 10.5, y: 35.0 }, origin: { x: 25.2, y: 45.5 }
    },
    {
        map: "ascent", agent: "sova", ability: "Shock", 
        side: "attack", difficulty: "medium", radius: 6,
        title: "B-Site Default Plant Shock",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 12.5, y: 18.0 }, origin: { x: 10.5, y: 70.0 }
    }
];
