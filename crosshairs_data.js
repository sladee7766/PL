// This file holds the crosshair data and the brain that draws them!

const crosshairsData = [
    { 
        name: "TenZ", 
        code: "0;s;1;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1" 
    },
    { 
        name: "Scream (Dot)", 
        code: "0;s;1;P;c;5;o;1;d;1;z;3;0t;6;0l;0;0a;1;0f;0;1b;0;S;c;6;s;0.949;o;1" 
    },
    { 
        name: "Demon1", 
        code: "0;s;1;P;o;1;f;0;0t;1;0l;3;0o;2;0a;1;0f;0;1b;0" 
    },
    { 
        name: "Default Green", 
        code: "0;P;c;1;h;0;0l;4;0o;2;0a;1;0f;0;1b;0" 
    },
    {
        name: "Kuron",
        code: "0;P;c;7;h;0;f;0;0l;3;0o;2;0a;1;0f;0;1b;0"
    }
];

// The core function to draw the Valorant Crosshair
// It now takes the actual canvas element directly so it never crashes!
function drawValorantCrosshair(canvas, code) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Default Valorant crosshair settings
    let c = 0, h = 1, t = 0.5, o = 1, d = 0, z = 2; 
    let i_b = 1, i_t = 2, i_l = 6, i_o = 3;         
    let o_b = 0, o_t = 2, o_l = 2, o_o = 10;
    
    try {
        // Read the string and update settings
        const p = code.split(';');
        for (let i = 0; i < p.length; i++) {
            if (p[i] === 'S' || p[i] === 'A') break; // Ignore Sniper/ADS profiles for the preview
            
            if (p[i] === 'c') c = parseInt(p[i+1]);
            if (p[i] === 'h') h = parseInt(p[i+1]);
            if (p[i] === 't') t = parseFloat(p[i+1]);
            if (p[i] === 'o') o = parseFloat(p[i+1]);
            if (p[i] === 'd') d = parseInt(p[i+1]);
            if (p[i] === 'z') z = parseFloat(p[i+1]);
            
            if (p[i] === '0b') i_b = parseInt(p[i+1]);
            if (p[i] === '0t') i_t = parseFloat(p[i+1]);
            if (p[i] === '0l') i_l = parseFloat(p[i+1]);
            if (p[i] === '0o') i_o = parseFloat(p[i+1]);
            
            if (p[i] === '1b') o_b = parseInt(p[i+1]);
            if (p[i] === '1t') o_t = parseFloat(p[i+1]);
            if (p[i] === '1l') o_l = parseFloat(p[i+1]);
            if (p[i] === '1o') o_o = parseFloat(p[i+1]);
        }

        // Valorant Colors array
        const colors = ['#FFFFFF', '#00FF00', '#ADFF2F', '#7FFF00', '#FFFF00', '#00FFFF', '#FF69B4', '#FF0000'];
        let color = colors[c] || '#00FFFF';

        // Check for Custom Hex Colors (u)
        for (let i = 0; i < p.length; i++) {
            if (p[i] === 'S' || p[i] === 'A') break;
            if (p[i] === 'u') color = '#' + p[i+1];
        }

        // --- CRITICAL FIX: Scale everything up so it is visible! ---
        const scale = 3; 
        z *= scale; o *= scale; 
        i_t *= scale; i_l *= scale; i_o *= scale;
        o_t *= scale; o_l *= scale; o_o *= scale;

        const cx = width / 2;
        const cy = height / 2;

        // Helper to draw rectangles from the center
        function drawRect(x, y, w, h_rect, fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(Math.round(x - w/2), Math.round(y - h_rect/2), w, h_rect);
        }

        // Draw Center Dot
        if (d === 1) {
            if (h === 1) drawRect(cx, cy, z + o*2, z + o*2, `rgba(0,0,0,${t})`); // Outline
            drawRect(cx, cy, z, z, color); // Inner color
        }

        // Draw Inner Lines
        if (i_b === 1 && i_l > 0 && i_t > 0) {
            const drawLine = (offsetX, offsetY, w, h_rect) => {
                if (h === 1) drawRect(cx + offsetX, cy + offsetY, w + o*2, h_rect + o*2, `rgba(0,0,0,${t})`); // Outline
                drawRect(cx + offsetX, cy + offsetY, w, h_rect, color); // Inner color
            }
            
            drawLine(0, -i_o - i_l/2, i_t, i_l); // Top Line
            drawLine(0, i_o + i_l/2, i_t, i_l);  // Bottom Line
            drawLine(-i_o - i_l/2, 0, i_l, i_t); // Left Line
            drawLine(i_o + i_l/2, 0, i_l, i_t);  // Right Line
        }

        // Draw Outer Lines
        if (o_b === 1 && o_l > 0 && o_t > 0) {
            const drawLine = (offsetX, offsetY, w, h_rect) => {
                if (h === 1) drawRect(cx + offsetX, cy + offsetY, w + o*2, h_rect + o*2, `rgba(0,0,0,${t})`); // Outline
                drawRect(cx + offsetX, cy + offsetY, w, h_rect, color); // Inner color
            }
            
            drawLine(0, -o_o - o_l/2, o_t, o_l); // Top Line
            drawLine(0, o_o + o_l/2, o_t, o_l);  // Bottom Line
            drawLine(-o_o - o_l/2, 0, o_l, o_t); // Left Line
            drawLine(o_o + o_l/2, 0, o_l, o_t);  // Right Line
        }

    } catch (error) {
        console.error("Failed to parse crosshair code.", error);
    }
}