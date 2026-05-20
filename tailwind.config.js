/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', '-apple-system', 'sans-serif'],
      },
      colors: {
        brown: { 50:'#F6F1EB', 100:'#EDE7DF', 200:'#D4C5B0', 400:'#A67355', 600:'#7C4D2F', 800:'#5C3820' },
        fl: { bg:'#F6F1EB', bg2:'#EDE7DF', bg3:'#E2DAD0', border:'#DDD4C8', text:'#1A1208', text2:'#6B5A4E', text3:'#A0917F' },
        green: { bg:'#E6F4EC', dark:'#2D7D52', DEFAULT:'#2D7D52' },
      },
    },
  },
  plugins: [],
};
