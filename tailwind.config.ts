import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { cream:'#f7eddc', kraft:'#c89b6c', rust:'#b85f3b', cocoa:'#5b3d2e', peach:'#efb07f' }, fontFamily: { hand:['"Segoe Print"','"Bradley Hand"','cursive'] }, boxShadow:{ postcard:'0 24px 70px rgba(91,61,46,.22)' } } }, plugins: [] };
export default config;
