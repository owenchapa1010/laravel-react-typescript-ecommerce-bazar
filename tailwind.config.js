import defaultTheme from 'tailwindcss/defaultTheme';


/** @type {import('tailwindcss').Config} */
export default {
    content: [ 
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
 
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('daisyui')],
};
