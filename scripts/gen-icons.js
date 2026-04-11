const fs = require('fs');
const path = require('path');

const dir = 'assets/web3icons/tokens/background';
const files = fs.readdirSync(dir);

let content = 'export const TOKEN_ICONS: Record<string, any> = {\n';

files.forEach(f => {
    if (f.endsWith('.svg')) {
        const name = path.parse(f).name.toUpperCase();
        content += `  '${name}': require('../assets/web3icons/tokens/background/${f}'),\n`;
    }
});

content += '};\n';

fs.writeFileSync('constants/token-icons.ts', content, { encoding: 'utf8' });
console.log('Registry generated successfully without BOM');
