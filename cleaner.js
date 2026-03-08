const fs = require('fs');

const path = require('path');

const replacements = {
    // Standard Latin-1 Mojibakes
    "Ã¡": "á",
    "Ã©": "é",
    "Ã­": "í",
    "Ã³": "ó",
    "Ãº": "ú",
    "Ã±": "ñ",
    "Ã\x81": "Á",
    "Ã\x89": "É",
    "Ã\x8d": "Í",
    "Ã\x93": "Ó",
    "Ã\x9a": "Ú",
    "Ã\x91": "Ñ",
    "Â¿": "¿",
    
    // Deformed artifacts from multiple PowerShell script runs
    "Ã¡": "á",
    "Ã©": "é",
    "Ã­": "í", // The soft hyphen
    "ÃƒÂ¡": "á",
    "ÃƒÂ©": "é",
    "ÃƒÂ­": "í",
    "ÃƒÂ³": "ó",
    "ÃƒÂº": "ú",
    "ÃƒÂ±": "ñ",
    "Ã‚Â¿": "¿",
    "Ã¢â‚¬â„¢": "'",
    "Ã¢â‚¬â€œ": "-",
    "Ã¢â‚¬Â¦": "...",
    "Ã¢â‚¬Å“": "\"",
    "Ã¢â‚¬Â ": "\"",
    "ÃƒÂ": "Á",
    "Ãƒ‰": "É",
    "Ãƒ ": "Í",
    "Ãƒ“": "Ó",
    "Ãƒš": "Ú",
    "Ãƒ‘": "Ñ",
    "Ã¿": "¿",
    "Á¿": "¿",
    "AÃ¡rabe": "Árabe",
    "Ã¡rabe": "árabe",
    "Ã¡rabes": "árabes",
    "Ã¡mbar": "Ámbar",
    "Ã rabe": "Árabe",
    "ÃƒÂ Ã¡rabe": "Árabe",
    
    // Residuals from my aggressive replaces
    "Á¡": "á", "Á©": "é", "Á­": "í", "Á³": "ó", "Áº": "ú", "Á±": "ñ",
    "CatÃ¡logo": "Catálogo",
    "Aárabe": "Árabe",
    "nuestáros": "nuestros",
    "estáela": "estela",
    "comenzóó": "comenzó",
    "úúnicos": "únicos",
    "ííntimo": "íntimo",
    "estáil": "estilo",
    "Pachulíí": "Pachulí",
    "tradicionalesÁ": "tradicionales?",
    "en la pielÁ": "en la piel?",
    "originalesÁ": "originales?",
    "para míÁ": "para mí?",
    "intensosÁ": "intensos?",
    "dure másÁ": "dure más?",
    "disponibleÁ": "disponible?",
    "faq-questáion": "faq-question",
    "faq-questÃ¡ion": "faq-question",
    "questÃ¡ion": "question",
    "questáion": "question",
    
    // Corrupted Icons in nosotros.html
    "Ã¢Â â€“": "❖",
    "Ã¢Å“Â§": "✧",
    "Ã¢Â â€š": "❂",
    "Ã¢â„¢â€”": "♔",
    "Ã¢Â§â€“": "⧖",
    "Ã¢Å“Â¦": "✦",
    "â –": "❖",
    "âœ§": "✧",
    "â ‚": "❂",
    "â™”": "♔",
    "â§–": "⧖",
    "âœ¦": "✦",
    "ǽ??\"": "❖",
    "o": "✧",
    "?</div>\\r\\n                <h3 class=\"diff-title\">Experiencia oriental</h3>": "❂</div>\r\n                <h3 class=\"diff-title\">Experiencia oriental</h3>",
    "T\"": "♔",
    "-": "⧖"
};

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Multi-pass replacement
    for (let i = 0; i < 3; i++) {
        for (const [key, value] of Object.entries(replacements)) {
            // using split join for global replace without regex hell
            content = content.split(key).join(value); 
        }
        
        // Clean overlapping manual corrections
        content = content.split("ááá").join("á");
        content = content.split("áá").join("á");
        content = content.split("éé").join("é");
        content = content.split("íí").join("í");
        content = content.split("óó").join("ó");
        content = content.split("úú").join("ú");
        content = content.split("ÁÁ").join("Á");
        content = content.split("nuestára").join("nuestra");
        content = content.split("estáela").join("estela");
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
});

console.log("HTML files cleaned successfully via NodeJS!");

