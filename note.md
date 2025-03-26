//Cài reactjs + vite
    npm create vite@latest my-app --template react
    cd my-app
    npm install
    nom run dev

// Cài tailwind
    npm install tailwindcss @tailwindcss/vite
    // Thêm taiwind vào file vite.config.js
        import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'
        export default defineConfig({
        plugins: [
            tailwindcss(),
        ],
        })
    //Thêm dòng này vào file css
        @import "tailwindcss";

//setup router
npm i react-dom react-router-dom

// tippyjs
npm i @tippyjs/react

// react-icon
npm install react-icons --save

//npm install @headlessui/react

