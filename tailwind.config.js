/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./vendor/hubleto/erp/**/*.{html,js,twig,tsx,php}",
    "./vendor/hubleto/enterprise/**/*.{html,js,twig,tsx,php}",
    "./vendor/hubleto/framework/**/*.{tsx,twig,php}",
    "./vendor/hubleto/react-ui/css/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}

