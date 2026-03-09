const fs = require('fs');
const path = require('path');

// Fixes for nosotros.html
const nosotrosPath = path.join(__dirname, 'nosotros.html');
let nost = fs.readFileSync(nosotrosPath, 'utf8');

// 1. Fixing Icons Card 1 and 3 
// Overwrite the specific diff-cards to avoid regex corruption
const card1regex = /<div class="diff-card">\s*<div class="diff-icon">.*?<\/div>\s*<h3 class="diff-title">Selección exclusiva<\/h3>/g;
const card1repl = '<div class="diff-card">\n                <div class="diff-icon">❖</div>\n                <h3 class="diff-title">Selección exclusiva</h3>';

const card3regex = /<div class="diff-card">\s*<div class="diff-icon">.*?<\/div>\s*<h3 class="diff-title">Experiencia oriental<\/h3>/g;
const card3repl = '<div class="diff-card">\n                <div class="diff-icon">❂</div>\n                <h3 class="diff-title">Experiencia oriental</h3>';

nost = nost.replace(card1regex, card1repl).replace(card3regex, card3repl);

// 2. Reduce Text in Section 1
const textRegex = /<div class="about-description">[\s\S]*?<\/div>/;
const newText = `<div class="about-description">
                    <p>S&amp;L Ventas nació de la pasión por las fragancias y el firme objetivo de llevar los mejores perfumes árabes al corazón de Uruguay.</p>
                    <p style="margin-top: 1rem;">Hoy somos una referencia de confianza y nuestra rigurosa curaduría garantiza una experiencia lujosa y de máxima duración en cada frasco.</p>
                </div>`;
nost = nost.replace(textRegex, newText);

fs.writeFileSync(nosotrosPath, nost, 'utf8');

// NAVBAR INJECTION
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Si no tiene el logo móvil
    if (!content.includes('<div class="nav-mobile-logo">')) {
        content = content.replace(/<nav class="nav-menu">/g, '<nav class="nav-menu">\n            <div class="nav-mobile-logo">S&amp;L VENTAS URUGUAY</div>');
        fs.writeFileSync(f, content, 'utf8');
    }
});

console.log("DOM fixes applied successfully!");
