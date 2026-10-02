/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "../erp/**/*.{html,js,twig,tsx,php}",
    "../enterprise/**/*.{html,js,twig,tsx,php}",
    "../framework/**/*.{tsx,twig,php}",
    "../react-ui/css/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hubleto-lookup__indicator',
    'hubleto-lookup__control',
    'hubleto-lookup__input-container',
    'hubleto-lookup__value-container',
    'hubleto-lookup__input',
  ],
  plugins: [],
}

