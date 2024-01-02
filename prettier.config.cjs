/** @type {import("prettier").Config} */
module.exports = {
  // i am just using the standard config, change if you need something else
  ...require('prettier-config-standard'),
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss'
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}