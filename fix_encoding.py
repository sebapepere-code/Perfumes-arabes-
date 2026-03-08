import os
import glob

def fix_mojibake(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Powershell double-encoded UTF-8 mapping
    replacements = {
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
        "Ã": "Á", 
        "Á¡": "á",
        "Á©": "é",
        "Á­": "í",
        "Á³": "ó",
        "Áº": "ú",
        "Á±": "ñ",
        "Á\x81": "Á",
        "Á\x89": "É",
        "Á\x8d": "Í",
        "Á\x93": "Ó",
        "Á\x9a": "Ú",
        "Á\x91": "Ñ",
        "Aárabe": "Árabe",
        "nuestáros": "nuestros",
        "estáela": "estela",
        "comenzóó": "comenzó",
        "úúnicos": "únicos",
        "ííntimo": "íntimo",
        "estáil": "estilo",
        "Ámbar": "Ámbar", # fixing potential mess
        "Pachulíí": "Pachulí",
        "Pachulí ": "Pachulí ",
        "tradicionalesÁ": "tradicionales?",
        "en la pielÁ": "en la piel?",
        "originalesÁ": "originales?",
        "para míÁ": "para mí?",
        "intensosÁ": "intensos?",
        "dure másÁ": "dure más?",
        "disponibleÁ": "disponible?",
        "faq-questáion": "faq-question",
        "questáion": "question",
        "CatÃ¡logo": "Catálogo",
        "Â ": " ",
        "Ã¢â‚¬â€œ": "❖",
        "Ã¢Å“Â§": "✧",
        "Ã¢â€šâ€š": "❂",
        "Ã¢â€žÂ¢Ã¢â‚¬ï¿½": "♔",
        "Ã¢Â§â€“": "⧖",
        "Ã¢Å“Â¦": "✦",
        "Ã¢Ââ€“": "❖",
        "Ã¢Å“Â§": "✧",
        "Ã¢Ââ€š": "❂",
        "Ã¢â„¢â€”": "♔",
        "Ã¢Â§â€“": "⧖",
        "Ã¢Å“Â¦": "✦",
        "Ã¢": "",
        "â –": "❖",
        "âœ§": "✧",
        "â ‚": "❂",
        "â™”": "♔",
        "â§–": "⧖",
        "âœ¦": "✦",
        "T\"": "♔",
        "o": "✧",
        "-": "❖",
        "?'": "❂",
        "Ã": "Á",
        "Á\x81Á\x9dÁ\x96": "❖",
        "Á\x81œÁ\x87": "✧",
        "Á\x81Á\x9dÁ\x82": "❂",
        "Á\x81„Á\x99Á\x94": "♔",
        "Á\x81§Á\x96": "⧖",
        "Á\x81œÁ\x86": "✦",
    }

    # Additional cleanup for the image artifacts (e.g. ÃƒÂ¡, Ã‚Â¿, etc)
    # The screenshots showed: Ã¿ (for ¿), Ã¡, Ã©, etc.
    # The screenshots showed: Ã¢ (from smart quotes or dashes)
    super_replacements = {
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
        "Ã¢â‚¬Â": "\"",
        "ÃƒÂ": "Á",
        "Ãƒ‰": "É",
        "Ãƒ": "Í",
        "Ãƒ“": "Ó",
        "Ãƒš": "Ú",
        "Ãƒ‘": "Ñ",
        "Ã¿": "¿",
        "Á¿": "¿"
    }

    for k, v in super_replacements.items():
        content = content.replace(k, v)

    for k, v in replacements.items():
        content = content.replace(k, v)
    
    # Common double accents from previous script fixes
    content = content.replace("ááá", "á")
    content = content.replace("áá", "á")
    content = content.replace("éé", "é")
    content = content.replace("íí", "í")
    content = content.replace("óó", "ó")
    content = content.replace("úú", "ú")
    content = content.replace("ÁÁ", "Á")
    content = content.replace("Á ", "Á")
    content = content.replace("Árabe", "árabe")
    content = content.replace("árabes", "árabes") # lowercasing back
    content = content.replace("Ámbar", "Ámbar")
    content = content.replace("nuestáros", "nuestros")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for fn in glob.glob("*.html"):
    fix_mojibake(fn)

print("HTML files processed.")
