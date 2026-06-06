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

const lineupData = [
    {
        map: "ascent", agent: "sova", ability: "Recon", title: "A-Site God Recon",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 42.5, y: 15.2 }, origin: { x: 45.0, y: 85.0 }
    },
    {
        map: "ascent", agent: "sova", ability: "Recon", title: "A-Site Wine Recon",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        target: { x: 42.5, y: 15.2 }, origin: { x: 31.4, y: 62.6 }
    }
];