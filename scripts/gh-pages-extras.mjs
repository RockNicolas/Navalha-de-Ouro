// Roda depois do build do GitHub Pages (npm run deploy).
// A branch gh-pages só tem o site pronto, sem package.json: se a Vercel tentar
// publicá-la, o build falha ("vite: command not found"). Este vercel.json vai
// junto na branch e diz à Vercel para não publicar nada dela.
import { writeFileSync } from 'node:fs';

writeFileSync('dist/vercel.json', JSON.stringify({ git: { deploymentEnabled: false } }, null, 2) + '\n');
console.log('dist/vercel.json criado: a Vercel vai ignorar a branch gh-pages.');
