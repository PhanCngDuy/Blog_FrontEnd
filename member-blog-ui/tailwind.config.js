/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
        'node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require('flowbite/plugin')],
};
