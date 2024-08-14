/** @type {import('tailwindcss').Config} */
export const content = [
  './views/**/*.ejs', // Adjust this path to where your EJS files are located
  './src/**/*.ts', // If you have any JS files that contain Tailwind classes
  './src/**/*.js', // If you have any JS files that contain Tailwind classes
  './src/**/*.tsx', // If you have any JS files that contain Tailwind classes
  './src/**/*.jsx', // If you have any JS files that contain Tailwind classes
];
export const theme = {
  extend: {},
};
export const plugins = [];

